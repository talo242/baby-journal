import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { gql } from 'graphql-request';
import useSWR from 'swr';
import { getAuthCookie } from '../../utils/auth-cookies';
import { Layout, RoutineList, TaskList } from '../../components';
import { InnerContainer } from '../../components/Layout/Layout';
import { graphQLClient } from '../../utils/graphql-client';

const RoutinePage = (props) => {
  const { token } = props;
  const router = useRouter();
  const { rid } = router.query;
  const fetcher = async (query) => await graphQLClient(token).request(query);
  const { data, error } = useSWR(
    [
      gql`
        query {
          findRoutineByID(id: ${rid}) {
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
    fetcher
  );

  return (
    <Layout>
      <Head>
        <title>Routine {rid}</title>
      </Head>
      <InnerContainer>
        <RoutineList token={token} />
        <TaskList data={data} error={error} />
      </InnerContainer>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
  return { props: { token: token } };
}

export default RoutinePage;
