//lib
import { NextPage } from 'next'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'

//image
import { ModalBase } from '../../../components/atoms/ModalBase'

const InvitePage: NextPage = () => {
  return (
    <AdminLayout title="招待" header="グループに招待する">
      <>
        <div className="mt-10 flex min-h-screen flex-col items-center">
          <h2 className="w-60 overflow-auto text-lg md:w-full md:text-xl">
            メールアドレスでユーザーを招待しましょう!
          </h2>
          <ModalBase />
        </div>
      </>
    </AdminLayout>
  )
}

export default InvitePage
