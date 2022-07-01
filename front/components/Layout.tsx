//lib
import Head from 'next/head'
import { ReactNode } from 'react'
import useStore from '../store'

//components
import { Footer } from './atom/Footer'
import { Auth } from './Auth'
import { Header } from './molecule/Header'

interface Props {
  title?: string
  header?: string
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ title = 'Shifty', header, children }) => {
  const session = useStore((state) => state.session)
  if (!session) return <Auth />
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="bg flex min-h-screen flex-col items-center justify-center font-mono text-gray-500">
        <div className="mt-10 font-sans text-4xl tracking-widest text-gray-500 md:text-4xl">
          {header}
        </div>
        <main className="flex w-screen flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
