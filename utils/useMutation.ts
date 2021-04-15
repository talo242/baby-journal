import useSWR from "swr";
import { graphQLClient } from "./graphql-client";

const fetcher = async (query, variables) => await graphQLClient.request(query, variables );

const useMutation = <T extends object>(query: string) => {
  const { data, error, mutate } = useSWR(query, fetcher)
  const loading = !data && !error;
  return { data, error, loading, mutate }
}

export default useMutation
