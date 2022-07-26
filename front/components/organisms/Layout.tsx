//lib
import Head from 'next/head'
import { ReactNode, useEffect } from 'react'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//hooks
import { useQueryProfile } from '../../hooks/query/useQueryProfile'

//components
import { Footer } from '../atoms/Footer'
import { Header } from './Header'
import { Navbar } from '../molecule/Navbar'

interface Props {
  title?: string
  header?: string
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ title = 'Shifty', header, children }) => {
  const setSession = useStore((state) => state.setSession)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  const { data } = useQueryProfile()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="bg relative min-h-screen text-gray-500">
        <div className="font-sans tracking-widest">
          <div className="w-full">
            <div className="w-full">
              {header && <p className="pt-10 text-center text-2xl md:text-4xl">{header}</p>}
              <div className="mb-20 text-center">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 w-screen">
        {data ? <Navbar isManagement={false} /> : <Footer />}
      </footer>
    </>
  )
}
