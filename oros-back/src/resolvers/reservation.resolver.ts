import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import Reservation, {
  InputCreateReservation,
  InputUpdateReservation,
  ReservationDeleted,
} from '../entities/Reservation.entity';
import ReservationServices from '../services/reservation.service';

@Resolver()
export default class ReservationResolver {
  @Query(() => [Reservation])
  async listReservations() {
    const users: Reservation[] = await new ReservationServices().list();
    return users;
  }

  @Mutation(() => Reservation)
  async createReservation(@Arg('infos') infos: InputCreateReservation) {
    const result: Reservation = await new ReservationServices().create(infos);
    console.log('RESULT', result);
    return result;
  }

  @Query(() => Reservation)
  async findReservationById(@Arg('id') id: string) {
    const materials: Reservation = await new ReservationServices().findById(id);
    return materials;
  }

  @Mutation(() => Reservation)
  async updateReservation(@Arg('infos') infos: InputUpdateReservation) {
    const { id, ...otherData } = infos;
    const materialToUpdate = await new ReservationServices().update(
      id,
      otherData,
    );
    return materialToUpdate;
  }

  @Mutation(() => ReservationDeleted)
  async deleteReservation(@Arg('id') id: string) {
    const { ...material } = await new ReservationServices().delete(id);
    return material;
  }
}
