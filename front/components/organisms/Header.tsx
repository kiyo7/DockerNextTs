//lib
import Image from 'next/image'
import { PlusCircleIcon, MailIcon, UserIcon, CogIcon, HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

//hooks
import { useQueryProfile } from '../../hooks/query/useQueryProfile'

//image
import logo from '../../images/logo.png'

export const Header: React.FC = () => {
  const { data } = useQueryProfile()

  const { push } = useRouter()

  const greeting = () => {
    let res
    const hour = new Date().getHours()

    if (hour >= 5 && hour <= 11) {
      res = 'おはようございます'
    }
    if (hour >= 12 && hour <= 17) {
      res = 'こんにちは'
    } else {
      res = 'こんばんは'
    }
    return res
  }

  return (
    <>
      <div className="navbar flex flex-wrap items-center justify-between bg-teal-500 p-4 text-white">
        <div className="navbar-start">
          <div className="mr-6 flex flex-shrink-0 items-center hover:cursor-pointer">
            <Image
              src={logo}
              width={40}
              height={40}
              onClick={() => {
                push('/dashBoard')
              }}
              alt="headerLogo"
            />
            <span className="text-xl font-semibold tracking-tight">Shifty</span>
          </div>
        </div>
        {data && (
          <div className="navbar-end text-xs md:text-lg">
            <p>
              {greeting()} {data?.username}さん
            </p>
          </div>
        )}
      </div>
    </>
  )
}
