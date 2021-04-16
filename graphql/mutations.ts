import { gql } from 'graphql-request';

export const CREATE_ROUTINE = gql`
  mutation CreateRoutine($title: String!, $owner: ID!) {
    createRoutine(data: { title: $title, owner: { connect: $owner } }) {
      _id
      title
    }
  }
`;
