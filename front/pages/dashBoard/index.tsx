//hooks
import { NextPage } from 'next'
import { Suspense } from 'react'

//hooks
import { useQueryProfile } from '../..//hooks/query/useQueryProfile'

//components
import { Admin } from '../../components/pages/Admin'
import { Spinner } from '../../components/atoms/Spinner'
import { Employee } from '../../components/pages/Employee'
import { Layout } from '../../components/organisms/Layout'

const DashBoard: NextPage = () => {
  const { data } = useQueryProfile()

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{data?.is_admin ? <Admin /> : <Employee />}</Suspense>
    </Layout>
  )
}

export default DashBoard
