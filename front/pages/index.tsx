//lib
import { NextPage } from 'next'

//utils
import useStore from '../store'

//components
import { Auth } from '../components/Auth'
import { DashBoard } from '../components/DashBoard'
import { ErrorBoundary } from 'react-error-boundary'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { Suspense } from 'react'
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
