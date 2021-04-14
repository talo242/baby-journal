import { gql } from "graphql-request"

export const FETCH_ALL_ROUTINES = gql`
  query FetchAllRoutines {
    allRoutines {
      data {
        _id
        title
        tasks {
          data {
            title
            _id
          }
        }
      }
    }
  }
`
