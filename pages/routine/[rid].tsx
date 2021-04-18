import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAuthCookie } from '../../utils/auth-cookies';
import { Layout, RoutineList } from '../../components';
import { InnerContainer } from '../../components/Layout/Layout';
import TaskView from '../../views/TaskList/TaskView';
import useFetchRoutine from '../../utils/useFetchRoutine';

const RoutinePage = (props) => {
  const { token } = props;
  const router = useRouter();
  const { rid } = router.query;
  const { data, error } = useFetchRoutine(rid, token);

  return (
    <Layout>
      <Head>
        <title>Routine {rid}</title>
      </Head>
      <InnerContainer>
        <RoutineList token={token} />
        <TaskView token={token} data={data} error={error} />
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
