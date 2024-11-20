import { gql } from "@apollo/client";

export const UPDATE_MATERIAL = gql`
  mutation UpdateMaterial($infos: InputUpdateMaterial!) {
    updateMaterial(infos: $infos) {
      id
      name
      category {
        id
      }
      slug
      price
      initial_stock
      image
      description
    }
  }
`;

export const CREATE_MATERIAL = gql`
  mutation CreateMaterial($infos: InputCreateMaterial!) {
    createMaterial(infos: $infos) {
      id
      name
      category {
        id
      }
      description
      image
      initial_stock
      price
      slug
    }
  }
`;

export const DELETE_MATERIAL = gql`
  mutation DeleteMaterial($deleteMaterialId: String!) {
    deleteMaterial(id: $deleteMaterialId) {
      success
      message
    }
  }
`;
