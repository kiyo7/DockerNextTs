//lib
import { NextPage } from 'next/types'
import { useRouter } from 'next/router'

//hooks
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'
import { useSubscribeOrganization } from '../../hooks/subscribe/useSubscribeOrganization'

//components
import { AdminLayout } from '../../components/AdminLayout'

const ManagementPage: NextPage = () => {
  useSubscribeOrganization()

  const { data } = useQueryOrganizations()
  const { push } = useRouter()

  if (!data) push('/')

  return (
    <AdminLayout title="ダッシュボード" header="ダッシュボード">
      <div>ダッシュボード</div>
    </AdminLayout>
  )
}

export default ManagementPage
