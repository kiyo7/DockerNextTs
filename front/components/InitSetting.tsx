//lib
import { Button, IconSmile } from '@supabase/ui'
import { SInput } from './atom/SInput'
import { useState } from 'react'
import { useRouter } from 'next/router'

//utils
import useStore from '../store'

//hooks
import { useMutateProfile } from '../hooks/mutate/useMutateProfile'

//components
import { RoleImage } from './atom/RoleImage'

//images
import employee from '../images/employee.png'
import manager from '../images/manager.png'

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
    updateEditedProfile({ ...editedProfile, isAdmin: selected })
  }

  const createProfile = () => {
    createProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      isAdmin: editedProfile.isAdmin,
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
      <p className="my-4 text-gray-500">仕事の種類</p>
      <p className=" text-sm text-red-400">※ 仕事の種類はあとで変更ができません! ※</p>
      <div className="mt-4 flex">
        <RoleImage src={manager} onClick={() => selectRole(true)} role={'管理者'} active={active} />
        <span className="mx-5" />
        <RoleImage
          src={employee}
          onClick={() => selectRole(false)}
          role={'従業員'}
          active={!active}
        />
      </div>
      <div className="m-auto my-10 w-7/12">
        <Button onClick={createProfile} block className="rounded-full">
          登録
        </Button>
      </div>
    </div>
  )
}
