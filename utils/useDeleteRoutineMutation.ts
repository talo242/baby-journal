import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { ROUTINE_ALL_INFO } from '../graphql/queries';
import { useMutationFunction } from '../types/useMutation';

const useDeleteRoutineMutation = (token: string): useMutationFunction => {
  const mutation = gql`
      mutation DeleteRoutine($id: ID!) {
          deleteRoutine(id: $id) {
              ...RoutineAllInfo
          }
      }
      ${ROUTINE_ALL_INFO}
  `;

  return async (variables) =>
    await graphQLClient(token).request(mutation, variables);
};

export default useDeleteRoutineMutation;
