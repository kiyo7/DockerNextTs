//lib
import { LogoutIcon, XCircleIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

//utils
import useStore from '../../store'

//components
import { Layout } from '../../components/organisms/Layout'

const Setting: NextPage = () => {
  const session = useStore((state) => state.session)
  const resetProfile = useStore((state) => state.resetProfile)
  const resetOrganization = useStore((state) => state.resetOrganization)

  const { logout, userDelete } = useMutateAuth()
  const { replace } = useRouter()

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
      <div className="menu w-full bg-base-100 px-12 text-sm lg:px-24 lg:text-4xl ">
        <div className="mb-10 flex justify-between">
          <p>ログイン方法</p>
          <p className="capitalize"> {session?.user?.identities![0].provider}</p>
        </div>
        <div className="mb-10 flex justify-between">
          <p>Emailアドレス</p>
          <p>{session?.user?.email}</p>
        </div>
        <div className="divider" />

        <div className="m-auto mt-4">
          <button
            onClick={signOut}
            className="flex w-full items-center hover:cursor-pointer hover:opacity-75"
          >
            <span className="mr-3">
              <LogoutIcon className="w-8" />
            </span>
            <p>ログアウト</p>
          </button>
        </div>
        <div className="divider" />
        <div className="m-auto mt-16">
          <button
            onClick={handleUserDelete}
            className="flex w-full hover:cursor-pointer hover:opacity-75"
          >
            <span className="mr-3">
              <XCircleIcon className="w-8 text-red-400" />
            </span>
            <p>アカウント削除</p>
          </button>
        </div>
      </div>
    </Layout>
  )
}
export default Setting
