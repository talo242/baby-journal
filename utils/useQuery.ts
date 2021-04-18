import { graphQLClient } from './graphql-client';
import useSWR from 'swr';

interface useFetchResponse<T extends object> {
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  loading: boolean;
  error: string;
  data: T;
}

const useQuery = <T extends object>(
  query: string,
  token: string,
  variables?: unknown
): useFetchResponse<T> => {
  const fetcher = async (query) => await graphQLClient(token).request(query);
  const { data, error, mutate } = useSWR([query, variables], fetcher);
  const loading = !data && !error;

  return { loading, error, data, mutate };
};

export default useQuery;
