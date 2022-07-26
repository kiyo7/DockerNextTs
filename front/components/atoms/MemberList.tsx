// lib
import Image from 'next/image'

//hooks
import { useDownloadUrl } from '../../hooks/useDownloadUrl'
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

// types
import { InviteStatus } from '../../types'

//images
import logo from '../../images/logo.png'

interface Props {
  id: string
  username: string
  avatar: string
  invitation_status: InviteStatus
}

export const MemberList: React.FC<Props> = ({ id, username, avatar, invitation_status }) => {
  const { data } = useQueryOrganizations()

  const { fullUrl: avatarUrl } = useDownloadUrl(avatar, 'avatars')

  return (
    <>
      <tr className="text-xs md:text-lg">
        <td>
          <div className="flex items-center space-x-3 ">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                  src={avatarUrl ? avatarUrl : logo}
                  alt="member avatar"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <div>
              <div className="font-semibold">{username}</div>
            </div>
          </div>
        </td>
        <td>
          {id === data?.administrator ? '管理者' : '従業員'}
          <br />
        </td>
        <td>
          {invitation_status === 'Invited' ? 'メンバー' : '招待中'}
          <br />
        </td>
      </tr>
    </>
  )
}
