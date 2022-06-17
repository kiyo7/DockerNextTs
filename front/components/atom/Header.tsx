//lib
import Image from 'next/image'
import { useRouter } from 'next/router'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

//utils
import useStore from '../../store'

//image
import logo from '../../images/headerLogo.png'

//components
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
        <div>
          <ul>
            <HeaderMenu contentsName={'プロフィール編集'} />
            <HeaderMenu onClick={signOut} contentsName={'ログアウト'} />
          </ul>
        </div>
      )}
    </nav>
  )
}
