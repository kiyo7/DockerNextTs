//lib
import { NextPage } from 'next'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'

const MembersPage: NextPage = () => {
  return (
    <AdminLayout title="メンバー一覧" header="メンバー一覧">
      <div>メンバー一覧</div>
    </AdminLayout>
  )
}

export default MembersPage
