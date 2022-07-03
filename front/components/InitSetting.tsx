//lib
import { Button, IconSmile } from '@supabase/ui'
import { SInput } from './atom/SInput'
import { useState } from 'react'
import { useRouter } from 'next/router'

//utils
import useStore from '../store'

//hooks
import { useMutateProfile } from '../hooks/mutate/useMutateProfile'

//images
import { RoleSelect } from './molecule/RoleSelect'

export const InitSetting: React.FC = () => {
  const [active, setActive] = useState(false)
  const { push } = useRouter()
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)

  const { createProfileMutation } = useMutateProfile()

  const activeRoleToggle = () => {
    setActive(!active)
  }

  const selectRole = (selected: boolean) => {
    if (active === selected) return
    activeRoleToggle()
    updateEditedProfile({ ...editedProfile, is_admin: selected })
  }

  const createProfile = () => {
    createProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      is_admin: editedProfile.is_admin,
      avatar: editedProfile.avatar,
    })
    push('/')
  }

  return (
    <div>
      <div className="my-10 text-center font-sans text-4xl tracking-widest text-gray-500">
        ようこそ
      </div>
      <SInput
        type="text"
        value={editedProfile?.username || ''}
        onChange={(e) => updateEditedProfile({ ...editedProfile, username: e.target.value })}
        label="あなたの名前"
        placeholder="田中 太郎"
        icon={<IconSmile />}
      />
      <RoleSelect selectRole={selectRole} active={active} />
      <div className="m-auto my-10 w-7/12">
        <Button onClick={createProfile} block className="rounded-full">
          登録
        </Button>
      </div>
    </div>
  )
}
