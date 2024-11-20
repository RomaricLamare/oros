import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Material from './Material.entity';

@ObjectType()
@Entity()
class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Material], { nullable: true })
  @OneToMany(() => Material, (m) => m.category, { nullable: true })
  materials: Material[];

  @Field()
  @Column()
  slug: string;
}

@InputType()
export class InputCreateCategory {
  @Field()
  name: string;

  @Field()
  slug: string;
}

@InputType()
export class InputUpdateCategory {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  slug: string;
}

@ObjectType()
export class CategoryDeleted {
  @Field()
  name: string;

  @Field()
  slug: string;
}

export default Category;
