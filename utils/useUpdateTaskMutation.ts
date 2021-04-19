import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { TASK_INFO_FRAGMENT } from '../graphql/queries';

const useUpdateTaskMutation = (token) => {
  const mutation = gql`
    mutation UpdateTask(
      $id: ID!
      $title: String!
      $due: Time!
      $completed: Boolean!
    ) {
      updateTask(
        id: $id
        data: { title: $title, due: $due, completed: $completed }
      ) {
        ...TaskInfoFragment
      }
    }
    ${TASK_INFO_FRAGMENT}
  `;

  return async (variables) =>
    await graphQLClient(token).request(mutation, variables);
};

export default useUpdateTaskMutation;
