import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { ROUTINE_ALL_INFO } from '../graphql/queries';

const useCreateRoutineMutation = (token) => {
  const mutation = gql`
    mutation CreateRoutine($title: String!, $owner: ID!) {
      createRoutine(data: { title: $title, owner: { connect: $owner } }) {
        ...RoutineAllInfo
      }
    }
    ${ROUTINE_ALL_INFO}
  `;
  return async (variables) =>
    await graphQLClient(token).request(mutation, variables);
};

export default useCreateRoutineMutation;
