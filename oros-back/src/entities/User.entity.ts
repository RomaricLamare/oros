import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType, InputType, ID } from 'type-graphql';
import * as argon2 from 'argon2';
import Reservation from './Reservation.entity';
import Session from './Session.entity';

type ROLE = 'ADMIN' | 'CLIENT';

@ObjectType()
@Entity()
export default class User {
  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (!this.password.startsWith('$argon2')) {
      this.password = await argon2.hash(this.password);
    }
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  private password: string;

  @Field(() => [Reservation], { nullable: true })
  @OneToMany(() => Reservation, (r) => r.user, { nullable: true })
  reservations: Reservation[];

  @Field()
  @Column({
    type: 'text',
    enum: ['ADMIN', 'CLIENT'],
    nullable: true,
    default: 'CLIENT',
  })
  role: ROLE;

  @Field(() => Session, { nullable: true })
  @OneToOne(() => Session, (session) => session.user, { nullable: true })
  session: Session;

  async verifyPassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@InputType()
export class InputRegister {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class InputChangeUserInfos {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;
}

@ObjectType()
export class UserDeleted {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
