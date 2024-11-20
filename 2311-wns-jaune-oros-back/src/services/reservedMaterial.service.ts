// reservedMaterial.service.ts
import { Repository } from 'typeorm';
import ReservedMaterial, {
  InputUpdateReservedMaterial,
} from '../entities/ReservedMaterial.entity';
import datasource from '../lib/datasource';
import Material from '../entities/Material.entity';
import Reservation from '../entities/Reservation.entity';

class ReservedMaterialService {
  db: Repository<ReservedMaterial>;
  materialRepository: Repository<Material>;
  reservationRepository: Repository<Reservation>;

  constructor() {
    this.db = datasource.getRepository(ReservedMaterial);
    this.materialRepository = datasource.getRepository(Material);
    this.reservationRepository = datasource.getRepository(Reservation);
  }

  async list() {
    return await this.db.find({
      relations: ['material', 'reservation', 'reservation.user'],
    });
  }


  async listByUserId(userId: string) {
    return await this.db.find({
      relations: ['material', 'reservation', 'reservation.user'],
      where: {
        reservation: {
          user: {
            id: userId,
          },
        },
      },
    });
}

  async findById(id: string) {
    const reservedMaterial = await this.db.findOne({
      where: { id },
      relations: { material: true, reservation: true },
    });
    if (!reservedMaterial) {
      throw new Error("Le matériel réservé n'existe pas");
    }
    return reservedMaterial;
  }

  async update(id: string, data: Omit<InputUpdateReservedMaterial, 'id'>) {
    const findReservedMaterial = await this.db.findOne({
      where: { id },
      relations: ['material', 'reservation'],
    });

    if (findReservedMaterial) {
      const reservedMaterialToSave = this.db.merge(findReservedMaterial, {
        ...data,
      });
      return await this.db.save(reservedMaterialToSave);
    }
  }

  async delete(id: string) {
    const reservedMaterialToDelete = await this.db.findOne({
      where: { id },
    });

    console.log('reservationToDelete', reservedMaterialToDelete);
    if (!reservedMaterialToDelete) {
      throw new Error("La reservation n'existe pas!");
    }

    return await this.db.remove(reservedMaterialToDelete);
  }
}

export default ReservedMaterialService;
