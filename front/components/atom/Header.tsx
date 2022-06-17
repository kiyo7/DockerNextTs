//lib
import Image from 'next/image'
import { useRouter } from 'next/router'
import { UserIcon, LogoutIcon } from '@heroicons/react/outline'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

//utils
import useStore from '../../store'
//image
import logo from '../../images/headerLogo.png'

import { HeaderMenu } from './HeaderMenu'

export const Header: React.FC = () => {
  const router = useRouter()
  const session = useStore((state) => state.session)

  const { logoutMutation } = useMutateAuth()

  const signOut = () => {
    logoutMutation.mutate()
  }

  return (
    <nav className="flex flex-wrap items-center  justify-between bg-teal-500 p-4">
      <div className="mr-6 flex flex-shrink-0 items-center text-white hover:cursor-pointer">
        <Image src={logo} width={40} height={40} onClick={() => router.push('/')} />
        <span className="text-xl font-semibold tracking-tight">Shifty</span>
      </div>
      {session && (
        //プロフのアイコンを表示　サブメニューとして以下のものを適用
        //プロフは最初は指定しないのでデフォルト値を生成
        //
        <div>
          <ul>
            <HeaderMenu onClick={() => {}} contentsName={'プロフィール編集'} Icon={<UserIcon />} />
            <HeaderMenu onClick={signOut} contentsName={'ログアウト'} Icon={<LogoutIcon />} />
          </ul>
        </div>
      )}
    </nav>
  )
}

