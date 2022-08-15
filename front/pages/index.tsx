//lib
import { NextPage } from 'next'
import { Suspense } from 'react'

//components
import { Auth } from '../components/pages/Auth'
import { Layout } from '../components/organisms/Layout'
import { Spinner } from '../components/atoms/Spinner'

const Home: NextPage = () => {
  return (
    <Layout title={'ログイン'}>
      <Suspense fallback={<Spinner />}>
        <Auth />
      </Suspense>
    </Layout>
  )
}

export default Home
