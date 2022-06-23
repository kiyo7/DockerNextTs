//lib
import { NextPage } from 'next'

//utils
import useStore from '../store'

//components
import { Auth } from '../components/Auth'
import { Layout } from '../components/Layout'
import { DashBoard } from '../components/DashBoard'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from '../components/atom/Spinner'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)

  const title = session ? 'ホーム' : 'ログイン'
  return (
    <Layout title={title}>
      {!session ? (
        <Auth />
      ) : (
        <ErrorBoundary
          fallback={<ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />}
        >
          <Suspense fallback={<Spinner />}>
            <DashBoard />
          </Suspense>
        </ErrorBoundary>
      )}
    </Layout>
  )
}

export default Home
