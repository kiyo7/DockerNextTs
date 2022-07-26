//lib
import { NextPage } from 'next'

//components
import { Auth } from '../components/pages/Auth'
import { Layout } from '../components/organisms/Layout'

const Home: NextPage = () => {
  return (
    <Layout title={'ログイン'}>
      <Auth />
    </Layout>
  )
}

export default Home
