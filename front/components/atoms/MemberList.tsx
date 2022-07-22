// lib
import Image from 'next/image'
import { useDownloadUrl } from '../../hooks/useDownloadUrl'

//types
// import { InviteStatus } from '../../types'

//images
import logo from '../../images/headerLogo.png'

interface Props {
  username: string
  avatar: string
  is_admin: boolean
  invitation_status: 'Uninvited' | 'Inviting' | 'Invited'
}

export const MemberList: React.FC<Props> = ({ username, avatar, is_admin, invitation_status }) => {
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
          {is_admin ? '管理者' : '従業員'}
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
