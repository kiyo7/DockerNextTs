//lib
import { Button } from '@supabase/ui'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { useEffect } from 'react'

//utils
import useStore from '../store'

//components
import { Auth } from '../components/Auth'
import { Layout } from '../components/Layout'
import { InitSetting } from '../components/InitSetting'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  return (
    <Layout title="DashBoard">
      {!session ? (
        <Auth />
      ) : (
        <div>
          <InitSetting />
        </div>
      )}
    </Layout>
  )
}

export default Home
