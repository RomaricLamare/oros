import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      name
      slug
    }
  }
`;

export const FIND_CATEGORY = gql`
  query FindCategoryById($id: String!) {
    findCategoryById(id: $id) {
      id
      materials {
        id
        name
        price
        image
        slug
      }
    }
  }
`;
