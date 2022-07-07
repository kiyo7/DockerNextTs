//lib
import Head from 'next/head'
import { ReactNode, useEffect } from 'react'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//components
import { Footer } from '../atom/Footer'
import { Header } from '../organisms/Header'

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
      console.log(_event)
      setSession(session)
    })
  }, [setSession])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="bg flex min-h-screen flex-col items-center justify-center font-mono text-gray-500">
        {header && (
          <>
            <p className="mt-10 font-sans text-4xl tracking-widest text-gray-500 md:text-4xl">
              {header}
            </p>
          </>
        )}
        <main className="flex w-screen flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
