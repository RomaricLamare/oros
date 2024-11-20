import { Repository } from 'typeorm';
import {
  InputCreateCategory,
  InputUpdateCategory,
} from '../entities/Category.entity';
import datasource from '../lib/datasource';
import Category from '../entities/Category.entity';

class CategoryServices {
  db: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Category);
  }

  async list() {
    return await this.db.find({ relations: { materials: true } });
  }

  async findById(id: number) {
    const category = await this.db.findOne({
      where: { id },
      relations: { materials: true },
    });
    if (!category) {
      throw new Error("La catégorie n'existe pas");
    }
    return category;
  }

  async create(data: InputCreateCategory) {
    const newCategory = await this.db.create(data);
    return await this.db.save(newCategory);
  }

  async update(id: number, data: Omit<InputUpdateCategory, 'id'>) {
    const findCategory = await this.db.findOne({
      where: { id },
    });

    if (findCategory) {
      const materialToSave = this.db.merge(findCategory, { ...data });
      return await this.db.save(materialToSave);
    }
  }

  async delete(id: number) {
    const categoryToDelete = await this.db.findOne({
      where: { id },
    });

    console.log('categoryToDelete', categoryToDelete);
    if (!categoryToDelete) {
      throw new Error("Le matériel n'existe pas!");
    }

    return await this.db.remove(categoryToDelete);
  }
}

export default CategoryServices;
