import { graphQLClient } from "./graphql-client";
import useSWR from "swr";

const fetcher = async (query) => await graphQLClient.request(query)

interface useFetchResponse<T extends object> {
  loading: boolean;
  error: string;
  data: T;
}

const useFetch = <T extends object>(query: string): useFetchResponse<T> => {
  const { data, error } = useSWR(query, fetcher)
  const loading = !data && !error;
  return { data, error, loading }
}

export default useFetch
