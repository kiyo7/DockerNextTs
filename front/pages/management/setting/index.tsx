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
  },
  {
    name: 'ユーザー通報',
    Icon: <ChatAltIcon className="w-8/12 text-purple-400" />,
  },
  {
    name: 'グループ削除',
    Icon: <ExclamationCircleIcon className="w-8/12 text-red-400" />,
  },
]

const SettingPage: NextPage = () => {
  return (
    <AdminLayout title="設定" header="設定">
      <div className="m-auto my-5 grid w-full grid-cols-2 md:w-4/6 lg:w-2/4">
        {contents.map((item) => {
          return <SettingContents contentsName={item.name} Icon={item.Icon} />
        })}
      </div>
    </AdminLayout>
  )
}

export default SettingPage
