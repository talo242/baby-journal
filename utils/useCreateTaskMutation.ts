import { gql } from 'graphql-request';
import { graphQLClient } from './graphql-client';
import { useMutationFunction } from '../types/useMutation';

const useCreateTaskMutation = (token: string): useMutationFunction => {
  const mutation = gql`
    mutation CreateTaskMutation(
      $title: String!
      $due: Time!
      $routine: ID!
      $owner: ID!
    ) {
      createTask(
        data: {
          title: $title
          due: $due
          completed: false
          owner: { connect: $owner }
          routine: { connect: $routine }
        }
      ) {
        _id
        title
        completed
      }
    }
  `;

  return async (variables) =>
    await graphQLClient(token).request(mutation, variables);
};

export default useCreateTaskMutation;
