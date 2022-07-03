//lib
import { IconHome, IconUser, IconSettings } from '@supabase/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

//utils
import useStore from '../../store'

//image
import logo from '../../images/headerLogo.png'

//components
import { HamburgerMenu } from '../atom/HamburgerMenu'
import { Menu } from '../atom/Menu'

export const Header: React.FC = () => {
  const session = useStore((state) => state.session)

  const router = useRouter()

  return (
    <>
      <div className="navbar flex flex-wrap items-center justify-between bg-teal-500 p-4">
        <div className="navbar-start">
          <div className="mr-6 flex flex-shrink-0 items-center text-white hover:cursor-pointer">
            <Image
              src={logo}
              width={40}
              height={40}
              onClick={() => {
                router.push('/')
              }}
              alt="headerLogo"
            />
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
                <Menu path={'/'} contentsName={'ホーム'} icon={<IconHome />} />
                <Menu
                  path={`/updateProfile/${session?.user?.id}`}
                  contentsName={'プロフィール編集'}
                  icon={<IconUser />}
                />
                <Menu
                  path={`/setting/${session?.user?.id}`}
                  contentsName={'設定'}
                  icon={<IconSettings />}
                />
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
