//lib
import { NextPage } from 'next/types'

//hooks
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

//components
import { Layout } from '../../components/Layout'
import { useMutateOrganizations } from '../../hooks/mutate/useMutateOrganizations'

const ManagementPage: NextPage = () => {
  const { data } = useQueryOrganizations()

  const { deleteOrganizationsMutation } = useMutateOrganizations()
  return (
    <Layout title="管理ページ">
      {data?.groupname}の管理ページ
      <button onClick={() => deleteOrganizationsMutation.mutate(data?.id!)}>text</button>
    </Layout>
  )
}

export default ManagementPage
