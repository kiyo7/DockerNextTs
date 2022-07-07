//lib
import { NextPage } from 'next/types'

//hooks
import { useSubscribeOrganization } from '../../hooks/subscribe/useSubscribeOrganization'

//components
import { AdminLayout } from '../../components/organisms/AdminLayout'

const ManagementPage: NextPage = () => {
  useSubscribeOrganization()
  return (
    <AdminLayout title="ダッシュボード" header="ダッシュボード">
      <div>ダッシュボード</div>
    </AdminLayout>
  )
}

export default ManagementPage
