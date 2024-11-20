import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
mutation CreateReservation($infos: InputCreateReservation!) {
  createReservation(infos: $infos) {
    id
    start_date
    end_date
    completed
    user {
      id
      firstname
    }
  }
}
`;