//lib
import { NextPage } from 'next'

//components
import { CreateOrganizations } from '../../components/molecule/CreateOrganizations'
import { Layout } from '../../components/organisms/Layout'

const createGroup: NextPage = () => {
  return (
    <Layout title="グループ作成" header="グループを作成">
      <div className="mt-10">
        <CreateOrganizations />
      </div>
    </Layout>
  )
}

export default createGroup
