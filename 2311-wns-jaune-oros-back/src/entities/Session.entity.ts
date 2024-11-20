import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User.entity';

@ObjectType()
export class CartItem {
   @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Field()
  materialId: string;

  @Field()
  quantity: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  initial_stock: number;

  @Field()
  @Column({ type: 'float' })
  price: number;

  @Field()
  @Column()
  slug: string;
}

@InputType()
export class CartItemInput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  materialId: string;

  @Field()
  quantity: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  initial_stock: number;

  @Field()
  price: number;

  @Field()
  slug: string;
}
@ObjectType()
export class Cart {
  @Field(() => [CartItem])
  cartItems: CartItem[];

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;
}

@ObjectType()
@Entity()
class Session {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User)
  @JoinColumn()
  @OneToOne(() => User)
  user: User;

  @Field(() => Cart)
  @Column({ type: 'jsonb' })
  cart: Cart;
}
@ObjectType()
@Entity()
export class DeletedCart {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User)
  @JoinColumn()
  @OneToOne(() => User)
  user: User;

  @Field(() => Cart)
  @Column({ type: 'jsonb' })
  cart: Cart;
}

export default Session;