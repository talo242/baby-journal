import { MutatorCallback } from 'swr/dist/types';

export interface useFetchResponse<Data> {
  error?: string;
  data: Data | null;
  mutate: (
    data?: Data | Promise<Data> | MutatorCallback<Data>,
    shouldRevalidate?: boolean
  ) => Promise<Data | undefined>;
}
