//lib
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

//hooks
import { useDownloadUrl } from '../../hooks/useDownloadUrl'
import { useMutateMembers } from '../../hooks/mutate/useMutateMembers'

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
  status: 'Inviting' | 'Invited' | 'Admin'
}

export const OrganizationCard: React.FC<Props> = ({ id, groupname, logo, status }) => {
  const session = useStore((state) => state.session)
  const setCurrentOrganization = useStore((state) => state.setCurrentOrganization)

  const { fullUrl: logoUrl } = useDownloadUrl(logo, 'groupLogo')

  const { push } = useRouter()

  const { toggleInviteStatus } = useMutateMembers()

  const acceptInvite = async () => {
    if (confirm('招待を受け入れますか？')) {
      const member = { id: id, member_id: session?.user?.id! }
      await toggleInviteStatus
        .mutateAsync(member)
        .then(() => {
          toast.success('招待を承諾しました')
        })
        .catch((err) => toast.error(err))
    }
  }

  const pushManagementConsole = () => {
    setCurrentOrganization({ id })
    push(`/management/${id}`)
  }

  const pushEmployeeConsole = () => {
    push(`/employee/`)
  }

  const clickEvent = () => {
    if (status === 'Inviting') {
      acceptInvite()
    } else if (status === 'Invited') {
      pushEmployeeConsole()
    } else {
      pushManagementConsole()
    }
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div
        onClick={clickEvent}
        className="m-auto my-8 flex w-11/12 items-center  break-all rounded-xl bg-gray-100 p-2 shadow-xl hover:cursor-pointer hover:opacity-75 md:w-8/12"
      >
        <span className="pl-2">
          <Image src={logoUrl ? logoUrl : initLogo} width={48} height={48} alt="groupLogo" />
        </span>
        <p className="ml-5 font-sans text-sm">{groupname}</p>
      </div>
    </Suspense>
  )
}
