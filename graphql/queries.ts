import { gql } from 'graphql-request';

const TASK_INFO_FRAGMENT = gql`
  fragment TaskInfoFragment on Task {
    _id: ID
    due: Time
    completed: Boolean
    owner: User
    title: String
  }
`;

const ROUTINE_INFO_FRAGMENT = gql`
  fragment RoutineInfoFragment on Routine {
    _id
    title
    tasks {
      data {
        ...TaskInfoFragment
      }
    }
  }
  ${TASK_INFO_FRAGMENT}
`;

export const FETCH_ALL_ROUTINES = gql`
  query FetchAllRoutines {
    allRoutines {
      data {
        _id
        title
      }
    }
  }
`;

export const FIND_ROUTINE_BY_ID = gql`
  query FindRoutineById($id: ID!) {
    ...RoutineInfoFragment
  }
  ${ROUTINE_INFO_FRAGMENT}
`;
