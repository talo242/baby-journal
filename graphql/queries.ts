import { gql } from 'graphql-request';

export const TASK_INFO_FRAGMENT = gql`
  fragment TaskInfoFragment on Task {
    _id
    due
    completed
    title
  }
`;

export const ROUTINE_ALL_INFO = gql`
  fragment RoutineAllInfo on Routine {
    _id
    title
  }
`;

export const FETCH_ALL_ROUTINES = gql`
  query FetchAllRoutines {
    allRoutines {
      data {
        ...RoutineAllInfo
      }
    }
  }
  ${ROUTINE_ALL_INFO}
`;
