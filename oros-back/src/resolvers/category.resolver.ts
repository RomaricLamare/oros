import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import {
  InputCreateCategory,
  InputUpdateCategory,
} from '../entities/Category.entity';
import CategoryServices from '../services/category.service';
import Category from '../entities/Category.entity';

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async listCategories() {
    const category: Category[] = await new CategoryServices().list();
    return category;
  }

  @Query(() => Category)
  async findCategoryById(@Arg('id') id: string) {
    const categories: Category = await new CategoryServices().findById(+id);
    return categories;
  }

  @Authorized('ADMIN')
  @Mutation(() => Category)
  async createCategory(@Arg('infos') infos: InputCreateCategory) {
    const result: Category = await new CategoryServices().create(infos);
    console.log('RESULT', result);
    return result;
  }

  @Authorized('ADMIN')
  @Mutation(() => Category)
  async updateCategory(@Arg('infos') infos: InputUpdateCategory) {
    const { id, ...otherData } = infos;
    const categoryToUpdate = await new CategoryServices().update(
      +id,
      otherData,
    );
    return categoryToUpdate;
  }

  @Authorized('ADMIN')
  @Mutation(() => Category)
  async deleteCategory(@Arg('id') id: string) {
    const categories: Category = await new CategoryServices().delete(+id);
    return categories;
  }
}
