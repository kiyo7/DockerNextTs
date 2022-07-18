// lib
import { useRouter } from 'next/router'

// hooks
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

// components
import { AdminContents } from '../molecule/AdminContents'
import Head from 'next/head'
import { Header } from './Header'
import { SPNavbar } from '../molecule/SPNavbar'

interface Props {
  title: string
  header?: string
  children: JSX.Element
}

export const AdminLayout: React.FC<Props> = ({ title, header = '', children }) => {
  const { data } = useQueryOrganizations()
  const { push } = useRouter()

  if (!data) push('/dashBoard')

  return (
    <>
      <Head>
        <title>Shifty | {title}</title>
      </Head>
      <Header />
      <div className="bg relative min-h-screen text-gray-500">
        <main className="font-sans tracking-widest">
          <article className="w-full">
            <aside className="hidden text-gray-100 lg:absolute lg:-inset-0 lg:block lg:w-60 lg:bg-teal-500">
              <div className="w-ful divider mt-0 items-stretch" />
              <div className="flex justify-center">
                <p className="text-center text-lg">{data?.groupname}</p>
              </div>
              <span className="divider" />
              <AdminContents ScreenIsSmall={false} />
            </aside>
            <section className="w-full lg:pl-60">
              <p className="pt-10 text-center text-2xl md:text-4xl">{header}</p>
              <div className="text-center">{children}</div>
            </section>
          </article>
        </main>
      </div>
      <footer className="w-full">
        <SPNavbar />
      </footer>
    </>
  )
}
