import { FETCH_ALL_ROUTINES } from '../../graphql/queries'
import Head from 'next/head'
import { Field, Form, ErrorMessage, Formik } from 'formik'
import { useState } from 'react'
import { graphQLClient } from '../../utils/graphql-client'
import { gql } from 'graphql-request'
import { getAuthCookie } from "../../utils/auth-cookies";
import useSWR from "swr";
import Layout from '../../components/Layout';

type Routine = {
  _id: string
  title: string
}

interface RoutineResponse {
  allRoutines: {
    data: Array<Routine>
  }
}

const RoutinesPage = (props) => {
  const { token } = props;
  const fetcher = async (query) => await graphQLClient(token).request(query)
  const [createError, setCreateError] = useState<string>('')
  const { data, error } = useSWR<RoutineResponse>(FETCH_ALL_ROUTINES, fetcher)

  const handleSubmit = async (values) => {
    console.log(values)
    const query = gql`
      mutation CreateRoutine($title: String!) {
        createRoutine(data: { title: $title }) {
          _id
          title
        }
      }
    `

    try {
      await graphQLClient(token).request(query, { title: values.title })
    } catch (error) {
      console.error(error)
      setCreateError(error.message)
    }
  }

  if (!data && !error) return <div>Loading</div>
  if (error) return <div>Error returning all the routines</div>

  return (
    <Layout>
      <Head>
        <title>Your routines</title>
      </Head>
      <div>
        <h1>Your routines</h1>
        {data &&
          data.allRoutines.data.map((routine) => (
            <li key={routine._id}>{routine.title}</li>
          ))}
        <hr />
        <h2>Create a new routine</h2>
        <Formik
          initialValues={{ title: '' }}
          // validate={(values) => {
          //   const errors = {}
          //
          //   if (!values.title) {
          //     errors.title = 'Required'
          //   }
          //
          //   return errors
          // }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
            // console.log(values)
            // setTimeout(() => {
            //   // alert(JSON.stringify(values, null, 2))
            //   //
            //   // setSubmitting(false)
            // }, 400)
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
  )
}

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}


export default RoutinesPage
