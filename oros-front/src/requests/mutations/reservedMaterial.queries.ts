import { gql } from "@apollo/client";

export const UPDATE_RESERVED_MATERIAL = gql`
    mutation Mutation($infos: InputUpdateReservedMaterial!) {
    updateReservedMaterial(infos: $infos) {
        id
        qtty_reserved
        price
        material {
        id
        }
        reservation {
        id
        }
    }
}`
;

export const DELETE_RESERVED_MATERIAL = gql`
    mutation DeleteReservedMaterial($deleteReservedMaterialId: String!) {
    deleteReservedMaterial(id: $deleteReservedMaterialId) {
        qtty_reserved
        price
        material {
        id
        }
        reservation {
        id
        }
    }
    }
`
;
