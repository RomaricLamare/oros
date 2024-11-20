import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User.entity';

@ObjectType()
@Entity()
class Reservation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.reservations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Field()
  @Column({ default: false })
  completed: boolean;
}

@InputType()
export class PartialUserInput {
  @Field()
  id: string;
}

@InputType()
export class MaterialReservationInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  qtty_reserved: number;

  @Field()
  price: number;
}

@InputType()
export class InputCreateReservation {
  @Field()
  start_date: Date;

  @Field()
  end_date: Date;

  @Field({ nullable: true })
  user: PartialUserInput;

  @Field(() => [MaterialReservationInput])
  material: MaterialReservationInput[];
}

@InputType()
export class InputUpdateReservation {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  start_date?: Date;

  @Field({ nullable: true })
  end_date?: Date;
}

@ObjectType()
export class ReservationDeleted {
  @Field()
  start_date: Date;

  @Field()
  end_date: Date;
}

export default Reservation;



