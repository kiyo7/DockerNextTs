//lib
import {
  CalendarIcon,
  ClipboardListIcon,
  CogIcon,
  ShareIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'

//hooks
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

//types
import { ManagementContents } from '../../types'

//components
import { Menu } from '../atom/Menu'

interface Props {
  ScreenIsSmall?: boolean
  spStyle?: string
}

export const AdminContents: React.FC<Props> = ({ ScreenIsSmall = true, spStyle }) => {
  const { data } = useQueryOrganizations()

  const route = '/management'

  const contents: ManagementContents[] = [
    {
      path: `${route}/${data?.id}`,
      contentsName: 'ダッシュボード',
      icon: <ClipboardListIcon className="w-10" />,
    },
    {
      path: `${route}/shift`,
      contentsName: 'シフト',
      icon: <CalendarIcon className="w-10" />,
    },
    {
      path: `${route}/members`,
      contentsName: 'メンバー',
      icon: <UserGroupIcon className="w-10" />,
    },
    {
      path: `${route}/invite`,
      contentsName: '招待',
      icon: <ShareIcon className="w-10" />,
    },
    {
      path: `${route}/setting`,
      contentsName: '設定',
      icon: <CogIcon className="w-10" />,
    },
  ]

  return (
    <ul className={`menu p-2 ${spStyle}`}>
      {contents.map((content, key) => {
        return (
          <Menu
            key={key}
            path={content.path}
            contentsName={ScreenIsSmall ? '' : content.contentsName}
            icon={content.icon}
          />
        )
      })}
    </ul>
  )
}
