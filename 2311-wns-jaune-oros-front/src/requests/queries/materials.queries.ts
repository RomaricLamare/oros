import { gql } from "@apollo/client";

export const LIST_MATERIALS = gql`
  query ListMaterials {
    listMaterials {
      id
      name
      description
      image
      price
      initial_stock
      slug
      category {
        id
        name
        slug
      }
    }
  }
`;

export const LIST_MATERIAL_BY_ID = gql`
  query FindMaterialById($id: String!) {
    findMaterialById(id: $id) {
      id
      name
      description
      category {
        id
        name
        slug
      }
      image
      price
      initial_stock
      slug
    }
  }
`;

export const LIST_MATERIAL_BY_IDS = gql`
query listMaterialsByIds($ids: [String!]!) {
  listMaterialsByIds(ids: $ids) {
    id
    name
    image
    description
    initial_stock
    price
    slug
    category {
      id
    }
  }
}
`;
