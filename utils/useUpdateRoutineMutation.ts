import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { ROUTINE_ALL_INFO } from '../graphql/queries';

const useUpdateRoutineMutation = (token) => {
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
