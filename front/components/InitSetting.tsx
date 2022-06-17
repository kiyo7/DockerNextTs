//lib
import { Button, IconSmile } from '@supabase/ui'
import { SInput } from './atom/Input'
import { useState } from 'react'

//components
import { RoleImage } from './atom/RoleImage'

//utils
import useStore from '../store'

//hooks
import { useMutateProfile } from '../hooks/mutate/useMutateProfile'

//images
import employee from '../images/employee.png'
import manager from '../images/manager.png'

export const InitSetting: React.FC = () => {
  const [active, setActive] = useState(false)
  const session = useStore((state) => state.session)
  const createProfile = useStore((state) => state.createProfile)
  const registerProfile = useStore((state) => state.registerProfile)

  const { createProfileMutation } = useMutateProfile()

  const activeRoleToggle = () => {
    setActive(!active)
  }

  const selectRole = (selected: boolean) => {
    activeRoleToggle()
    registerProfile({ ...createProfile, isAdmin: selected })
  }

  return (
    <div className="mx-3">
      <div className="my-10 text-center font-sans text-4xl tracking-widest text-gray-500">
        ようこそ
      </div>
      <SInput
        type="text"
        value={createProfile.username || ''}
        onChange={(e) => registerProfile({ ...createProfile, username: e.target.value })}
        label="あなたの名前"
        placeholder="田中 太郎"
        icon={<IconSmile />}
      />
      <p className="mt-8 text-gray-500">仕事の種類</p>
      {createProfile.isAdmin !== null && (
        <p className=" text-sm text-red-400">※ 仕事の種類はあとで変更ができません! ※</p>
      )}
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
        <Button
          onClick={() => createProfileMutation.mutate({ ...createProfile, id: session?.user?.id })}
          block
          className="rounded-full"
        >
          登録
        </Button>
      </div>
    </div>
  )
}
