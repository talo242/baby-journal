import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Head>
        <title>Baby Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Baby Journal</h1>
        <p>
          Welcome, here you can keep a journal for every routine your little
          baby must do
        </p>
        <Link href="/routines">Go to routines</Link>
      </div>
    </>
  )
}

export default Home
