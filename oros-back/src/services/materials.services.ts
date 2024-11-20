import { In, Repository } from 'typeorm';
import {
  InputCreateMaterial,
  InputUpdateMaterial,
} from '../entities/Material.entity';
import datasource from '../lib/datasource';
import Material from '../entities/Material.entity';
import CategoryServices from './category.service';

class MaterialServices {
  db: Repository<Material>;
  constructor() {
    this.db = datasource.getRepository(Material);
  }

  async list() {
    return await this.db.find({ relations: { category: true } });
  }

  async findById(id: string) {
    const material = await this.db.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!material) {
      throw new Error("Le matériel n'existe pas");
    }
    return material;
  }

  async create(data: InputCreateMaterial) {
    const category = await new CategoryServices().findById(data.category.id);
    const newMaterial = await this.db.create({ ...data, category });
    return await this.db.save(newMaterial);
  }

  async update(id: string, data: Omit<InputUpdateMaterial, 'id'>) {
    const findMaterial = await this.db.findOne({
      where: { id },
      relations: ['category'],
    });

    if (findMaterial) {
      const materialToSave = this.db.merge(findMaterial, { ...data });
      return await this.db.save(materialToSave);
    }
  }

  async delete(id: string) {
    const materialToDelete = await this.db.findOne({
      where: { id },
      relations: ['category'],
    });

    console.log('materielToDelete', materialToDelete);
    if (!materialToDelete) {
      throw new Error("Le matériel n'existe pas!");
    }

    return await this.db.remove(materialToDelete);
  }

  async listManyMaterials(ids: string[]): Promise<Material[]> {
    return await this.db.find({
      where: { id: In(ids) },
      relations: ['category'],
    });
  }
}

export default MaterialServices;
