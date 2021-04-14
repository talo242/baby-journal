import { FETCH_ALL_ROUTINES } from '../../graphql/queries'
import Head from 'next/head'
import useFetch from '../../utils/useFetch'

type Routine = {
  _id: string
  title: string
}

interface RoutineResponse {
  allRoutines: {
    data: Array<Routine>
  }
}

const RoutinesPage = () => {
  const { loading, data, error } = useFetch<RoutineResponse>(FETCH_ALL_ROUTINES)
  if (loading) return <div>Loading</div>
  if (error) return <div>Error returning all the routines</div>

  return (
    <>
      <Head>
        <title>All routines</title>
      </Head>
      <div>
        <h1>All routines</h1>
        {data &&
          data.allRoutines.data.map((routine) => (
            <li key={routine._id}>{routine.title}</li>
          ))}
      </div>
    </>
  )
}

export default RoutinesPage
