//lib
import { LogoutIcon, XCircleIcon, UserIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

//hooks
import { useMutateAuth } from '../../../hooks/mutate/useMutateAuth'

//utils
import useStore from '../../../store'

//components
import { Layout } from '../../../components/organisms/Layout'
import { PrimaryButton } from '../../../components/atoms/PrimaryButton'

const Setting: NextPage = () => {
  const session = useStore((state) => state.session)
  const resetProfile = useStore((state) => state.resetProfile)
  const resetOrganization = useStore((state) => state.resetOrganization)

  const { logout, userDelete } = useMutateAuth()
  const { replace, push } = useRouter()

  const pushUpdateProfile = () => {
    push('setting/updateProfile/')
  }

  const signOut = () => {
    if (confirm('ログアウトしますか？')) {
      resetProfile()
      resetOrganization()
      logout.mutate()
      replace('/')
    } else {
      return
    }
  }

  const handleUserDelete = () => {
    if (confirm('本当に削除しますか?')) {
      userDelete.mutateAsync(session?.user?.id!).then(() => replace('/'))
    }
  }

  return (
    <Layout title="設定" header="設定">
      <div className="mt-10 w-screen px-12">
        <div className="text-sm lg:px-24 lg:text-4xl ">
          <div className="mb-10 flex justify-between">
            <p>ログイン方法</p>
            <p className="capitalize"> {session?.user?.identities![0].provider}</p>
          </div>
          <div className="mb-10 flex justify-between">
            <p>Emailアドレス</p>
            <p>{session?.user?.email}</p>
          </div>
        </div>
        <div className="m-auto w-full">
          <div className="m-auto w-11/12 lg:w-8/12">
            <PrimaryButton
              buttonText={'プロフィール編集'}
              buttonColor="accent"
              clickEvent={pushUpdateProfile}
              icon={<UserIcon className="w-6" />}
            />
          </div>
          <div className="divider" />
          <div className="m-auto w-8/12 lg:w-5/12">
            <PrimaryButton
              buttonText={'ログアウト'}
              clickEvent={signOut}
              icon={<LogoutIcon className="w-6" />}
            />
          </div>
          <div className="divider" />
          <div className="m-auto w-8/12 lg:w-5/12">
            <PrimaryButton
              buttonText={'アカウント削除'}
              buttonColor="error"
              clickEvent={handleUserDelete}
              icon={<XCircleIcon className="w-6 " />}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Setting
