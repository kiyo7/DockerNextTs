//lib
import { Button } from '@mantine/core'
import { Input } from '@mantine/core'
import { UserGroupIcon } from '@heroicons/react/solid'
import { useInputState } from '@mantine/hooks'

//hooks
import { useMutateOrganizations } from '../../../hooks/mutate/useMutateOrganizations'
import { useQueryOrganizations } from '../../../hooks/query/useQueryOrganizations'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'

const renameGroup: React.FC = () => {
  const [stringValue, setStringValue] = useInputState('')

  const { updateOrganizations } = useMutateOrganizations()

  const { data } = useQueryOrganizations()

  const handleRename = () => {
    updateOrganizations.mutate({
      id: data!.id,
      administrator: data!.administrator,
      groupname: stringValue,
      logo: data!.logo,
    })
  }
  return (
    <AdminLayout title={'グループ名変更'} header={'グループ名変更'}>
      <div className="flex flex-col items-center">
        <h1 className="my-12 text-xl">こちらではグループ名を変更することができます。</h1>

        <div className="my-10 rounded-full bg-gray-500 px-12">
          <h2 className="my-10 text-xl text-white md:text-2xl">
            現在のグループ名 : {data?.groupname}
          </h2>
        </div>
        <div className="flex w-full flex-col items-center">
          <Input
            value={stringValue}
            onChange={setStringValue}
            icon={<UserGroupIcon className="p-2" />}
            variant="filled"
            placeholder="新しいグループ名"
            radius="lg"
            size="lg"
            className="w-9/12 lg:w-7/12"
          />
        </div>
        <div className="my-12">
          <Button
            radius="lg"
            size="lg"
            className="bg-teal-400"
            onClick={handleRename}
            disabled={!stringValue}
          >
            変更する
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default renameGroup
