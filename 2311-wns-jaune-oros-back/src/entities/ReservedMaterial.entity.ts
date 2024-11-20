import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Material from './Material.entity';
import Reservation from './Reservation.entity';

@ObjectType()
@Entity()
class ReservedMaterial {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  qtty_reserved: number;

  @Field()
  @Column()
  price: number;

  @Field(() => Material)
  @ManyToOne(() => Material)
  material: Material;

  @Field(() => Reservation)
  @ManyToOne(() => Reservation)
  reservation: Reservation;
}

@InputType()
export class PartialMaterialInput {
  @Field()
  id: string;
}

@InputType()
export class PartialReservationInput {
  @Field()
  id: string;
}

@InputType()
export class InputUpdateReservedMaterial {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  qtty_reserved: number;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  material: PartialMaterialInput;

  @Field({ nullable: true })
  reservation: PartialReservationInput;
}

@ObjectType()
export class ReservedMaterialDeleted {
  @Field({ nullable: true })
  qtty_reserved: number;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  material: Material;

  @Field({ nullable: true })
  reservation: Reservation;
}

export default ReservedMaterial;
