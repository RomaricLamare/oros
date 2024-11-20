import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation CreateUser($infos: InputRegister!) {
    createUser(infos: $infos) {
      id
      email
      firstname
      lastname
      password
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($infos: InputChangeUserInfos!) {
    updateUser(infos: $infos) {
      id
      firstname
      lastname
      email
      password
      reservations {
        id
      }
      role
    }
  }
`;