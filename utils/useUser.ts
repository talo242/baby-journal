import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const useUser = () => {
  const { data, error, mutate } = useSWR('/api/user', fetcher);

  return { data, error, mutate };
};

export default useUser;
