import { graphQLClient } from './graphql-client';
import useSWR from 'swr';
import { gql } from 'graphql-request';

const useFetchRoutine = (id, token) => {
  const fetcher = async (query) => await graphQLClient(token).request(query);
  const { data, error, mutate } = useSWR(
    [
      gql`
      query {
        findRoutineByID(id: ${id}) {
            _id
            title
            tasks {
                data {
                _id
                title
                due
                completed
              }
            }
          }
        }
      `,
    ],
    fetcher,
    { revalidateOnFocus: false }
  );

  return { data, error, mutate };
};

export default useFetchRoutine;
