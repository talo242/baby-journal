import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { FETCH_ALL_ROUTINES } from '../graphql/queries';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import { graphQLClient } from '../utils/graphql-client';
import { getAuthCookie } from '../utils/auth-cookies';
import Layout from '../components/Layout';
import { CREATE_ROUTINE } from '../graphql/mutations';
import useQuery from '../utils/useQuery';

interface User {
  id: string;
  email: string;
}

interface Routine {
  _id: string;
  title: string;
}

interface RoutineResponse {
  allRoutines: {
    data: Array<Routine>;
  };
}

const Home = (props) => {
  const { token } = props;
  const [createError, setCreateError] = useState<string>('');
  const { data, error, loading, mutate } = useQuery<RoutineResponse>(
    FETCH_ALL_ROUTINES,
    token
  );
  const { data: user } = useSWR<User>('/api/user');

  const handleSubmit = async (values) => {
    try {
      await graphQLClient(token).request(CREATE_ROUTINE, {
        title: values.title,
        owner: user.id,
      });
      mutate({
        allRoutines: {
          data: data.allRoutines.data.concat({
            title: values.title,
            _id: Date.now().toString(),
          }),
        },
      });
    } catch (error) {
      console.error(error);
      setCreateError(error.message);
    }
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error returning all the routines</div>;

  return (
    <Layout>
      <Head>
        <title>Your routines</title>
      </Head>
      <div>
        <h1>Your routines</h1>
        {data &&
          data.allRoutines.data.map((routine) => (
            <li key={routine._id}>
              <Link href={`routine/${routine._id}`}>{routine.title}</Link>
            </li>
          ))}
        <hr />
        <h2>Create a new routine</h2>
        <Formik
          initialValues={{ title: '' }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {createError && <p style={{ color: 'red' }}>{createError}</p>}
      </div>
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
