import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './Category.entity';

@ObjectType()
@Entity()
class Material {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (c) => c.materials, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;

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
export class PartialCategoryInput {
  @Field()
  id: number;
}

@InputType()
export class InputCreateMaterial {
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

  @Field({ nullable: true })
  category: PartialCategoryInput;

  @Field()
  slug: string;
}

@InputType()
export class InputUpdateMaterial {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  category: PartialCategoryInput;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  initial_stock: number;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  slug: string;
}

@ObjectType()
export class MaterialDeleted {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

export default Material;
