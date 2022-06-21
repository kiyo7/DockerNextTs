//lib
import Image from 'next/image'
import { IconHome, IconUser, IconSettings, IconLogOut } from '@supabase/ui'
import { useRouter } from 'next/router'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

//utils
import useStore from '../../store'

//image
import logo from '../../images/headerLogo.png'

//components
import { HeaderMenu } from '../atom/header/HeaderMenu'
import { HamburgerMenu } from '../atom/header/HamburgerMenu'
import { useQueryProfile } from '../../hooks/query/useQueryProfile'

export const Header: React.FC = () => {
  const router = useRouter()
  const session = useStore((state) => state.session)

  const { logoutMutation } = useMutateAuth()

  const signOut = () => {
    logoutMutation.mutate()
    router.push('/')
  }

  return (
    <>
      <div className="navbar flex flex-wrap items-center justify-between bg-teal-500 p-4">
        <div className="navbar-start">
          <div className="mr-6 flex flex-shrink-0 items-center text-white hover:cursor-pointer">
            <Image src={logo} width={40} height={40} onClick={() => router.push('/')} />
            <span className="text-xl font-semibold tracking-tight">Shifty</span>
          </div>
        </div>
        {session && (
          <div className="navbar-center mr-6">
            <div className="dropdown">
              <HamburgerMenu />
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box right-1 top-1 w-60 bg-base-100 p-2 shadow"
              >
                <HeaderMenu path="/" contentsName={'ホーム'} Icon={<IconHome />} />
                <HeaderMenu
                  path={`/updateProf/${session?.user?.id}`}
                  contentsName={'プロフィール編集'}
                  Icon={<IconUser />}
                />
                <HeaderMenu
                  path={`/setting/${session?.user?.id}`}
                  contentsName={'設定'}
                  Icon={<IconSettings />}
                />
                <div className="divider"></div>

                <HeaderMenu
                  clickEvent={signOut}
                  contentsName={'ログアウト'}
                  Icon={<IconLogOut />}
                />
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
