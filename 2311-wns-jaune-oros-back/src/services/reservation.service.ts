import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import datasource from '../lib/datasource';
import Reservation, {
  InputUpdateReservation,
} from '../entities/Reservation.entity';
import { InputCreateReservation } from '../entities/Reservation.entity';
import ReservedMaterial from '../entities/ReservedMaterial.entity';
import Material from '../entities/Material.entity';
import User from '../entities/User.entity';
import MaterialServices from './materials.services';

class ReservationServices {
  db: Repository<Reservation>;
  reservedMaterialRepository: Repository<ReservedMaterial>;
  materialRepository: Repository<Material>;
  userRepository: Repository<User>;

  constructor() {
    this.db = datasource.getRepository(Reservation);
    this.reservedMaterialRepository =
      datasource.getRepository(ReservedMaterial);
    this.materialRepository = datasource.getRepository(Material);
    this.userRepository = datasource.getRepository(User);
  }

  async checkAndReincrementStock() {
    const now = new Date();
    const reservations = await this.db.find({
      where: {
        end_date: LessThanOrEqual(now),
        completed: false,
      },
    });

    for (const reservation of reservations) {
      const reservedMaterials = await this.reservedMaterialRepository.find({
        where: { reservation: { id: reservation.id } },
        relations: ['material'],
      });

      for (const reservedMaterial of reservedMaterials) {
        const material = reservedMaterial.material;
        material.initial_stock += reservedMaterial.qtty_reserved;
        await this.materialRepository.save(material);
      }

      // Marquer la réservation comme terminée
      reservation.completed = true;
      await this.db.save(reservation);
    }
  }

  async list() {
    return await this.db.find({ relations: { user: true } });
  }

  async create(data: InputCreateReservation) {
    const { material, user, start_date, end_date, ...reservationData } = data;
    const userToReserve = await this.userRepository.findOneBy({ id: user.id });
    if (!userToReserve) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    const listMaterialsPromises: Promise<Material>[] = [];
    // Associer chaque matériel à la réservation via ReservedMaterial
    for (const materialInfo of material) {
      const { id } = materialInfo;
      const materialPromise = new MaterialServices().findById(id);
      listMaterialsPromises.push(materialPromise);
    }

    const listMaterials = await Promise.all(listMaterialsPromises);

    // Vérifier les réservations existantes et futures pour la période demandée
    for (const mat of listMaterials) {
      const existingReservations = await this.reservedMaterialRepository.find({
        where: {
          material: mat,
          reservation: {
            start_date: LessThanOrEqual(end_date),
            end_date: MoreThanOrEqual(start_date),
          },
        },
        relations: ['reservation'],
      });

      // Calculer le stock disponible pour la période demandée
      const totalReserved = existingReservations.reduce(
        (total, reservedMaterial) => total + reservedMaterial.qtty_reserved,
        0,
      );

      const { qtty_reserved } = material.find((m) => m.id == mat.id)!;

      if (mat.initial_stock - totalReserved < qtty_reserved) {
        throw new Error(
          `${mat.name} : stock insuffisant pour la période demandée`,
        );
      }
    }

    // Créer la réservation sans décrémenter le stock en temps réel
    const newReservation = this.db.create({
      ...reservationData,
      user: userToReserve,
      start_date,
      end_date,
    });
    const savedReservation = await this.db.save(newReservation);

    const reservationMaterialsPromises: Promise<ReservedMaterial>[] = [];

    for (const mat of listMaterials) {
      const { price, qtty_reserved } = material.find((m) => m.id == mat.id)!;

      const reservedMaterial = this.reservedMaterialRepository.create({
        qtty_reserved,
        price,
        material: mat,
        reservation: savedReservation,
      });
      const reservedMaterialPromise =
        this.reservedMaterialRepository.save(reservedMaterial);
      reservationMaterialsPromises.push(reservedMaterialPromise);
    }
    await Promise.all(reservationMaterialsPromises);
    return savedReservation;
  }

  async findById(id: string) {
    const reservation = await this.db.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!reservation) {
      throw new Error("La réservation n'existe pas");
    }
    return reservation;
  }

  async update(id: string, data: Omit<InputUpdateReservation, 'id'>) {
    const findMaterial = await this.db.findOne({
      where: { id },
      relations: { user: true },
    });

    if (findMaterial) {
      const materialToSave = this.db.merge(findMaterial, { ...data });
      return await this.db.save(materialToSave);
    }
  }

  async delete(id: string) {
    const reservationToDelete = await this.db.findOne({
      where: { id },
    });

    console.log('reservationToDelete', reservationToDelete);
    if (!reservationToDelete) {
      throw new Error("La reservation n'existe pas!");
    }

    return await this.db.remove(reservationToDelete);
  }
}

export default ReservationServices;
