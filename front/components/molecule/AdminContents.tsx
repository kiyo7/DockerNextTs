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

export const AdminContents = () => {
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
    <div className="menu">
      <ul className="pl-2">
        {contents.map((content) => {
          return (
            <Menu path={content.path} contentsName={content.contentsName} icon={content.icon} />
          )
        })}
      </ul>
    </div>
  )
}
