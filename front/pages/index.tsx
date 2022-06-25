//lib
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'

//utils
import useStore from '../store'

//components
import { Auth } from '../components/Auth'
import { DashBoard } from '../components/DashBoard'
import { Layout } from '../components/Layout'
import { useEffect } from 'react'
import { supabase } from '../utils/supabase'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  const title = session ? 'ホーム' : 'ログイン'
  return <Layout title={title}>{!session ? <Auth /> : <DashBoard />}</Layout>
}

export default Home
