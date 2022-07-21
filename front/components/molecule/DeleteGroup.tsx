//lib
import { FormEvent, useState } from 'react'

//hooks
import { useMutateOrganizations } from '../../hooks/mutate/useMutateOrganizations'
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

//components
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SInput } from '../atoms/SInput'

export const DeleteGroup: React.FC = () => {
  const [orgName, setOrgName] = useState('')
  const { data } = useQueryOrganizations()

  const { deleteOrganizations } = useMutateOrganizations()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    confirm('本当に削除しますか？')
    deleteOrganizations.mutate(data?.id!)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-auto w-6/12">
        <SInput
          type={'text'}
          value={orgName}
          onChange={(e) => {
            setOrgName(e.target.value)
          }}
          placeholder={data?.groupname}
        />
        <PrimaryButton
          buttonText={'削除する'}
          textColor="red-400"
          disabled={orgName !== data?.groupname}
        />
      </div>
    </form>
  )
}
