import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($infos: InputLogin!) {
    login(infos: $infos) {
      success
      message
  }
 }
`;

export const LOGOUT = gql`
 query Logout {
  logout {
    success
    message
  }
}
`;

export const USER_INFOS = gql`
query UserInfos {
  userInfos {
    id
    firstname
    lastname
    email
    password
    reservations {
      id
    }
    role
    session {
      id
      cart {
        endDate
        startDate
        cartItems {
          slug
          price
          initial_stock
          image
          description
          name
          quantity
          materialId
        }
      }
    }
  }
}
`;


 