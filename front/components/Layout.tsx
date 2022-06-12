//lib
import Head from 'next/head'
import { ReactNode } from 'react'
import { Footer } from './atom/Footer'

interface Props {
  title?: string
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ title = 'Shifty', children }) => {
  return (
    <div className=" bg flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">{children}</main>
      <Footer />
    </div>
  )
}
