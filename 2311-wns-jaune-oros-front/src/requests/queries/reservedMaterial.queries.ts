import { gql } from "@apollo/client";

export const LIST_RESERVATION_BY_ID = gql`
query ListReservedMaterialsByUserId($userId: String!) {
  listReservedMaterialsByUserId(userId: $userId) {
    id
    qtty_reserved
    price
    material {
      id
      name
      description
      image
      price
    }
    reservation {
      id
      user {
        id
      }
      start_date
      end_date
      completed
    }
  }
}`
;

export const FIND_RESERVATION_BY_ID = gql`
query Query($findReservedMaterialByIdId: String!) {
  findReservedMaterialById(id: $findReservedMaterialByIdId) {
    id
    qtty_reserved
    price
    material {
      id
      name
      image
      price
    }
    reservation {
      id
    }
  }
}`
;

export const LIST_RESERVED_MATERIEL_BY_USER_ID = gql`
query ListReservedMaterielByUserId($userId: String!) {
  listReservedMaterialsByUserId(userId: $userId) {
    id
    qtty_reserved
    price
    material {
      id
      name
      description
      image
      initial_stock
      price
      slug
    }
    reservation {
      id
      start_date
      end_date
      completed
    }
  }
}
`;

export const LIST_ALL_RESERVATIONS = gql`
query ListReservedMaterials {
  listReservedMaterials {
    id
    qtty_reserved
    price
    material {
      id
      name
      image
    }
    reservation {
      user {
        id
        firstname
        lastname
      }
      end_date
      start_date
    }
  }
}
`;