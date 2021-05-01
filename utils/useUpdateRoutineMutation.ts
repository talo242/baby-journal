import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { ROUTINE_ALL_INFO } from '../graphql/queries';
import { useMutationFunction } from '../types/useMutation';

const useUpdateRoutineMutation = (token: string): useMutationFunction => {
  const mutation = gql`
    mutation UpdateRoutine($id: ID!, $title: String!) {
      updateRoutine(id: $id, data: { title: $title }) {
        ...RoutineAllInfo
      }
    }
    ${ROUTINE_ALL_INFO}
  `;

  return async (variables) =>
    await graphQLClient(token).request(mutation, variables);
};

export default useUpdateRoutineMutation;
