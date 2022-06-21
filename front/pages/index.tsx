//lib
import { NextPage } from 'next'

//utils
import useStore from '../store'

//components
import { Auth } from '../components/Auth'
import { Layout } from '../components/Layout'
import { DashBoard } from '../components/DashBoard'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)

  const title = session ? 'ホーム' : 'ログイン'

  return <Layout title={title}>{!session ? <Auth /> : <DashBoard />}</Layout>
}

export default Home
