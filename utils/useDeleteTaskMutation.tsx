import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { TASK_INFO_FRAGMENT } from '../graphql/queries';

const useDeleteTaskMutation = (token) => {
  const mutation = gql`
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id) {
        ...TaskInfoFragment
      }
    }
    ${TASK_INFO_FRAGMENT}
  `;

  return async (variables) =>
    await graphQLClient(token).request(mutation, variables);
};

export default useDeleteTaskMutation;
