import React from 'react';
import { useRouter } from 'next/router';
import { getAuthCookie } from '../../utils/auth-cookies';

const RoutinePage = () => {
  const router = useRouter();
  const { rid } = router.query;
  return <p>Routine: {rid}</p>;
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
