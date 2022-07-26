//lib
import {
  CalendarIcon,
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  PlusCircleIcon,
  ShareIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'

//hooks
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

//types
import { ContentsType } from '../../types'

//components
import { Menu } from '../atoms/Menu'

interface Props {
  ScreenIsSmall?: boolean
  spStyle?: string
}

export const MainContents: React.FC<Props> = ({ ScreenIsSmall = true, spStyle }) => {
  const route = '/dashBoard'

  const mainContents: ContentsType[] = [
    {
      contentsName: 'ホーム',
      path: `${route}`,
      Icon: <HomeIcon className="w-10" />,
    },
    {
      contentsName: 'グループ作成',
      path: `${route}/createGroup`,
      Icon: <PlusCircleIcon className="w-10" />,
    },
    {
      contentsName: '設定',
      Icon: <CogIcon className="w-10" />,
      path: `${route}/setting/`,
    },
  ]

  return (
    <ul className={`menu p-2 ${spStyle}`}>
      {mainContents.map((content, key) => {
        return (
          <Menu
            key={key}
            path={content.path}
            contentsName={ScreenIsSmall ? '' : content.contentsName}
            icon={content.Icon}
          />
        )
      })}
    </ul>
  )
}

export const ManagementContents: React.FC<Props> = ({ ScreenIsSmall = true, spStyle }) => {
  const { data } = useQueryOrganizations()

  const route = '/management'

  const managementContents: ContentsType[] = [
    {
      contentsName: 'ダッシュボード',
      Icon: <ClipboardListIcon className="w-10" />,
      path: `${route}/${data?.id}`,
    },
    {
      contentsName: 'シフト',
      Icon: <CalendarIcon className="w-10" />,
      path: `${route}/shift`,
    },
    {
      contentsName: 'メンバー',
      Icon: <UserGroupIcon className="w-10" />,
      path: `${route}/members`,
    },
    {
      contentsName: '招待',
      Icon: <ShareIcon className="w-10" />,
      path: `${route}/invite`,
    },
    {
      contentsName: '設定',
      Icon: <CogIcon className="w-10" />,
      path: `${route}/setting`,
    },
  ]

  return (
    <ul className={`menu p-2 ${spStyle}`}>
      {managementContents.map((content, key) => {
        return (
          <Menu
            key={key}
            contentsName={ScreenIsSmall ? '' : content.contentsName}
            icon={content.Icon}
            path={content.path}
          />
        )
      })}
    </ul>
  )
}
