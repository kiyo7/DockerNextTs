// lib
import Image from 'next/image'
import { useDownloadUrl } from '../../hooks/useDownloadUrl'

//images
import logo from '../../images/headerLogo.png'

interface Props {
  key: number
  username: string
  avatar: string
  is_admin: boolean
}

export const MemberList: React.FC<Props> = ({ key, username, avatar, is_admin }) => {
  const { fullUrl: avatarUrl } = useDownloadUrl(avatar, 'avatars')

  return (
    <>
      <tr key={key}>
        <td>
          <div className="flex items-center space-x-3">
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
              <div className="font-bold">{username}</div>
            </div>
          </div>
        </td>
        <td>
          {is_admin ? '管理者' : '従業員'}
          <br />
        </td>
        <td>
          招待済み{/* 仮 */}
          <br />
        </td>
      </tr>
    </>
  )
}
