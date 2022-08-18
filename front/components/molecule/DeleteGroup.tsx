//lib
import { Input } from '@mantine/core'
import { FormEvent, useState } from 'react'

//hooks
import { useMutateOrganizations } from '../../hooks/mutate/useMutateOrganizations'
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

//components
import { PrimaryButton } from '../atoms/PrimaryButton'

export const DeleteGroup: React.FC = () => {
  const [orgName, setOrgName] = useState('')

  const { data } = useQueryOrganizations()

  const { deleteOrganizations } = useMutateOrganizations()

  const id = localStorage.getItem('currentOrganization')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    confirm('本当に削除しますか？')
    deleteOrganizations.mutate(id!)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-auto w-6/12">
        <Input.Wrapper label="ユーザーネーム" className="text-left">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOrgName(e.target.value)
            }}
            placeholder={data?.groupname}
            radius="md"
            value={orgName}
          />
        </Input.Wrapper>
        <PrimaryButton
          buttonText={'削除する'}
          textColor="red-400"
          disabled={orgName !== data?.groupname}
        />
      </div>
    </form>
  )
}
