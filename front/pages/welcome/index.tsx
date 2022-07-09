//lib
import { Button, IconSmile } from '@supabase/ui'
import { NextPage } from 'next'
import { SInput } from '../../components/atom/SInput'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/router'

//utils
import useStore from '../../store'

//hooks
import { useMutateProfile } from '../../hooks/mutate/useMutateProfile'

//images
import { RoleSelect } from '../../components/molecule/RoleSelect'
import { Layout } from '../../components/organisms/Layout'
import { useQueryProfile } from '../../hooks/query/useQueryProfile'
import { Spinner } from '../../components/atom/Spinner'

const WelcomePage: NextPage = () => {
  const [active, setActive] = useState(false)
  const { replace } = useRouter()
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const { createProfile } = useMutateProfile()

  const { data } = useQueryProfile()

  if (data) replace('/dashBoard')

  const activeRoleToggle = () => {
    setActive(!active)
  }

  const selectRole = (selected: boolean) => {
    if (active === selected) return
    activeRoleToggle()
    updateEditedProfile({ ...editedProfile, is_admin: selected })
  }

  const handleCreateProfile = () => {
    createProfile.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      is_admin: editedProfile.is_admin,
      avatar: editedProfile.avatar,
    })
    replace('/dashBoard')
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Layout title="初期設定" header="ようこそ">
        <div>
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
            <Button onClick={handleCreateProfile} block className="rounded-full">
              登録
            </Button>
          </div>
        </div>
      </Layout>
    </Suspense>
  )
}

export default WelcomePage
