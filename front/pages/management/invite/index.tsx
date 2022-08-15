//lib
import { NextPage } from 'next'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'

//image
import { InviteCard } from '../../../components/molecule/InviteCard'

const InvitePage: NextPage = () => {
  return (
    <AdminLayout title="招待" header="グループに招待する">
      <>
        <div className="mt-10 flex min-h-screen flex-col items-center">
          <h2 className="my-12 w-60 overflow-auto text-lg md:w-full md:text-2xl">
            メールアドレスでユーザーを招待しましょう!
          </h2>
          <InviteCard />
        </div>
      </>
    </AdminLayout>
  )
}

export default InvitePage
