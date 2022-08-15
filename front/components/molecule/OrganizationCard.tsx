//lib
import Image from 'next/image'
import { useRouter } from 'next/router'

//hooks
import { useDownloadUrl } from '../../hooks/useDownloadUrl'

//utils
import useStore from '../../store'

//components
import { Spinner } from '../atoms/Spinner'
import { Suspense } from 'react'

// images
import initLogo from '../../images/logo.png'

interface Props {
  id: string
  groupname: string
  logo: string
}

export const OrganizationCard: React.FC<Props> = ({ id, groupname, logo }) => {
  const { fullUrl: logoUrl } = useDownloadUrl(logo, 'groupLogo')
  const setCurrentOrganization = useStore((state) => state.setCurrentOrganization)

  const { push } = useRouter()

  const pushManagementConsole = async () => {
    setCurrentOrganization({ id })
    push(`/management/${id}`)
  }
  return (
    <li
      onClick={pushManagementConsole}
      className="m-auto my-8 flex w-11/12 flex-row break-all rounded-xl bg-gray-100 shadow-xl hover:cursor-pointer hover:opacity-75 md:w-8/12"
    >
      <Suspense fallback={<Spinner />}>
        <span>
          {logoUrl ? (
            <Image src={logoUrl} width={20} height={20} alt="groupLogo" />
          ) : (
            <Image src={initLogo} width={48} height={48} alt="groupLogo" />
          )}
        </span>
      </Suspense>
      <p className="font-sans text-sm">{groupname}</p>
    </li>
  )
}
