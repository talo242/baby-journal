import { graphQLClient } from './graphql-client';
import useSWR from 'swr';
import { FETCH_ALL_ROUTINES } from '../graphql/queries';
import { useFetchResponse } from '../types/useFetch';
import { RoutineResponse } from '../types/Routine';

const useFetchAllRoutines = (
  token: string
): useFetchResponse<RoutineResponse> => {
  const fetcher = async (query) => await graphQLClient(token).request(query);
  const { data, error, mutate } = useSWR(FETCH_ALL_ROUTINES, fetcher, {
    revalidateOnFocus: false,
  });

  return { data, error, mutate };
};

export default useFetchAllRoutines;
