import { GraphQLClient } from 'graphql-request';

interface Variables {
  [key: string]: any;
}

export type useMutationFunction = (variables: Variables) => Promise<GraphQLClient>;
