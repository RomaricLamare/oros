import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import {
  InputCreateMaterial,
  InputUpdateMaterial,
  MaterialDeleted,
} from '../entities/Material.entity';
import MaterialServices from '../services/materials.services';
import Material from '../entities/Material.entity';

@Resolver()
export default class MaterialResolver {
  @Query(() => [Material])
  async listMaterials() {
    const materials: Material[] = await new MaterialServices().list();
    return materials;
  }

  @Query(() => [Material])
  async listMaterialsByIds(
    @Arg('ids', () => [String]) ids: string[],
  ): Promise<Material[]> {
    const materials: Material[] =
      await new MaterialServices().listManyMaterials(ids);
    return materials;
  }

  @Query(() => Material)
  async findMaterialById(@Arg('id') id: string) {
    const materials: Material = await new MaterialServices().findById(id);
    return materials;
  }

  @Authorized('ADMIN')
  @Mutation(() => Material)
  async createMaterial(@Arg('infos') infos: InputCreateMaterial) {
    const result: Material = await new MaterialServices().create(infos);
    console.log('RESULT', result);
    return result;
  }

  @Authorized('ADMIN')
  @Mutation(() => Material)
  async updateMaterial(@Arg('infos') infos: InputUpdateMaterial) {
    const { id, ...otherData } = infos;
    const materialToUpdate = await new MaterialServices().update(id, otherData);
    return materialToUpdate;
  }

  @Authorized('ADMIN')
  @Mutation(() => MaterialDeleted)
  async deleteMaterial(@Arg('id') id: string): Promise<MaterialDeleted> {
    await new MaterialServices().delete(id);
    return {
      success: true,
      message: 'Material deleted successfully',
    };
  }
}
