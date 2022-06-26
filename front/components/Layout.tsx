//lib
import Head from 'next/head'
import { ReactNode } from 'react'

//components
import { Footer } from './atom/Footer'
import { Header } from './molecule/Header'

interface Props {
  title?: string
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ title = 'Shifty', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="bg flex min-h-screen flex-col items-center justify-center font-mono text-gray-500">
        <main className="flex w-screen flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
