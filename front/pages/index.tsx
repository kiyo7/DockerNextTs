//lib
import { NextPage } from 'next'

//components
import { Auth } from '../components/pages/Auth'
import { Layout } from '../components/organisms/Layout'

const Home: NextPage = () => {
  const title = 'ログイン'
  return (
    <Layout title={title}>
      <Auth />
    </Layout>
  )
}

export default Home
