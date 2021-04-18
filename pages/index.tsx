import React from 'react';
import Head from 'next/head';
import { getAuthCookie } from '../utils/auth-cookies';
import Layout from '../components/Layout';
import RoutineList from '../components/RoutineList/RoutineList';
import { InnerContainer } from '../components/Layout/Layout';
import TaskListPlaceholder from '../components/TaskList/TaskListPlaceholder';

const Home = (props) => {
  const { token } = props;

  return (
    <Layout>
      <Head>
        <title>Your routines</title>
      </Head>
      <InnerContainer>
        <RoutineList token={token} />
        <TaskListPlaceholder />
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

export default Home;
