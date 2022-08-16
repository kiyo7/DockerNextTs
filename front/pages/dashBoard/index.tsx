//hooks
import { NextPage } from 'next'
import { Suspense, useEffect } from 'react'

//components
import { Main } from '../../components/pages/Main'
import { Spinner } from '../../components/atoms/Spinner'
import { Layout } from '../../components/organisms/Layout'
import useStore from '../../store'
import { useQueryClient } from 'react-query'

const DashBoard: NextPage = () => {
  const queryClient = useQueryClient()
  const resetOrganization = useStore((state) => state.resetOrganization)

  useEffect(() => {
    resetOrganization()
    localStorage.removeItem('currentOrganization')
    queryClient.removeQueries('organization')
  })
  return (
    <Layout title="ホーム">
      <Suspense fallback={<Spinner />}>
        <Main />
      </Suspense>
    </Layout>
  )
}

export default DashBoard
