import React from 'react';
import { useRouter } from 'next/router';
import { getAuthCookie } from '../../utils/auth-cookies';
import { Layout, RoutineList } from '../../components';
import { InnerContainer } from '../../components/Layout/Layout';
import TaskView from '../../views/TaskList/TaskView';
import useFetchRoutine from '../../utils/useFetchRoutine';

const RoutinePage = (props) => {
  const { token } = props;
  const router = useRouter();
  const { rid } = router.query;

  if (Array.isArray(rid)) {
    return <p>Invalid link</p>;
  }

  const { data, error } = useFetchRoutine(rid, token);

  return (
    <Layout>
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
