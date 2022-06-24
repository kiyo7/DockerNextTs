//lib
import Head from 'next/head'
import { ReactNode, useEffect } from 'react'

//components
import { Footer } from './atom/Footer'
import { Header } from './molecule/Header'

//hooks
import { supabase } from '../utils/supabase'
import useStore from '../store'

interface Props {
  title?: string
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ title = 'Shifty', children }) => {
  const setSession = useStore((state) => state.setSession)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  return (
    <>
      <Header />
      <div className="bg flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
        <Head>
          <title>{title}</title>
        </Head>
        <main className="flex w-screen flex-1 flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
