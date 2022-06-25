//lib
import { NextPage } from 'next'

//components
import { Layout } from '../../components/Layout'
import { useQueryProfile } from '../../hooks/query/useQueryProfile'

const Setting: NextPage = () => {
  const { data } = useQueryProfile()

  return (
    <Layout title="設定">
      <p>{data?.username}さんの設定ページ</p>
    </Layout>
  )
}
export default Setting
