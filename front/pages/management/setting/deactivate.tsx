//lib
import { NextPage } from 'next/types'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'
import { DeleteGroup } from '../../../components/molecule/DeleteGroup'

const Deactivate: NextPage = () => {
  return (
    <AdminLayout title="グループ削除" header="グループ削除">
      <div>
        <h1 className="my-12 text-xl">こちらではグループを削除することが出来ます。</h1>
        <p className="mb-12 text-red-400">※この操作は取り消すことは出来ません※</p>
        <DeleteGroup />
      </div>
    </AdminLayout>
  )
}

export default Deactivate
