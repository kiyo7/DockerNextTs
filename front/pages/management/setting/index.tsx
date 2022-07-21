//lib
import { ChatAltIcon, ExclamationCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'
import { SettingContents } from '../../../components/atoms/SettingContents'

const contents = [
  {
    name: 'グループ名変更',
    Icon: <PencilAltIcon className="w-8/12 text-gray-400" />,
    path: 'setting/',
  },
  {
    name: 'ユーザー通報',
    Icon: <ChatAltIcon className="w-8/12 text-purple-400" />,
    path: 'setting/',
  },
  {
    name: 'グループ削除',
    Icon: <ExclamationCircleIcon className="w-8/12 text-red-400" />,
    path: 'setting/deactivate',
  },
]

const SettingPage: NextPage = () => {
  return (
    <AdminLayout title="設定" header="設定">
      <div className="m-auto mt-5 grid w-full grid-cols-2 md:w-4/6 lg:w-2/4">
        {contents.map((item, key) => {
          return (
            <SettingContents key={key} contentsName={item.name} Icon={item.Icon} path={item.path} />
          )
        })}
      </div>
    </AdminLayout>
  )
}

export default SettingPage
