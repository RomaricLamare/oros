import { Arg, Mutation, Query } from 'type-graphql';
import ReservedMaterial, {
  InputUpdateReservedMaterial,
  ReservedMaterialDeleted,
} from '../entities/ReservedMaterial.entity';
import ReservedMaterialService from '../services/reservedMaterial.service';

export default class ReservedMaterialResolver {
  @Query(() => [ReservedMaterial])
  async listReservedMaterials() {
    const reservedMaterials: ReservedMaterial[] =
      await new ReservedMaterialService().list();
    return reservedMaterials;
  }

  @Query(() => [ReservedMaterial])
    async listReservedMaterialsByUserId(@Arg('userId') userId: string) {
    const reservedMaterials: ReservedMaterial[] =
      await new ReservedMaterialService().listByUserId(userId);
    return reservedMaterials;
}

  @Query(() => ReservedMaterial)
  async findReservedMaterialById(@Arg('id') id: string) {
    const reservedMaterial: ReservedMaterial =
      await new ReservedMaterialService().findById(id);
    return reservedMaterial;
  }

  @Mutation(() => ReservedMaterial)
  async updateReservedMaterial(
    @Arg('infos') infos: InputUpdateReservedMaterial,
  ) {
    const { id, ...otherData } = infos;
    const reservedMaterialToUpdate = await new ReservedMaterialService().update(
      id,
      otherData,
    );
    return reservedMaterialToUpdate;
  }

  @Mutation(() => ReservedMaterialDeleted)
  async deleteReservedMaterial(@Arg('id') id: string) {
    const reservedMaterial = await new ReservedMaterialService().delete(id);
    return reservedMaterial;
  }
}
