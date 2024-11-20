import { gql } from "@apollo/client";

export const UPDATE_CART = gql`
  mutation UpdateCart(
    $endDate: DateTimeISO!
    $startDate: DateTimeISO!
    $quantity: Float!
    $materialId: String!
    $sessionId: String!
  ) {
    updateCart(
      endDate: $endDate
      startDate: $startDate
      quantity: $quantity
      materialId: $materialId
      sessionId: $sessionId
    ) {
      id
      user {
        id
      }
      cart {
        cartItems {
          materialId
          quantity
          name
          description
          image
          initial_stock
          price
          slug
        }
        startDate
        endDate
      }
    }
  }
`;

export const RESET_CART = gql`
  mutation ResetCart($sessionId: String!) {
    resetCart(sessionId: $sessionId) {
      id
      user {
        id
      }
      cart {
        startDate
        endDate
      }
    }
  }
`;

export const UPDATE_MANY_CART = gql`
  mutation UpdateManyCart(
    $cartItems: [CartItemInput!]!
    $endDate: DateTimeISO!
    $startDate: DateTimeISO!
    $sessionId: String!
  ) {
    updateManyCart(
      cartItems: $cartItems
      endDate: $endDate
      startDate: $startDate
      sessionId: $sessionId
    ) {
      cartItems {
        name
        image
        description
        quantity
        materialId
        initial_stock
        slug
        price
      }
      startDate
      endDate
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($sessionId: String!, $materialId: String!) {
    removeCartItem(sessionId: $sessionId, materialId: $materialId) {
      id
      user {
        id
      }
      cart {
        cartItems {
          materialId
          quantity
          name
          description
          image
          initial_stock
          price
          slug
        }
        startDate
        endDate
      }
    }
  }
`;
