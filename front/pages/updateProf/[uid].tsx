//lib
import { Button, IconSmile } from '@supabase/ui'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

//hooks
import { useMutateProfile } from '../../hooks/mutate/useMutateProfile'

//utils
import useStore from '../../store'

//components
import { SInput } from '../../components/atom/Input'

//components
import { Avatar } from '../../components/atom/Avatar'
import { ImgUploadButton } from '../../components/atom/ImgUploadButton'
import { Layout } from '../../components/Layout'

import img from '../../images/main.jpg' //仮

const ProfileUpdate: NextPage = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const { updateProfileMutation } = useMutateProfile()

  const { push } = useRouter()

  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      avatar: editedProfile.avatar,
    })
    push('/')
  }

  return (
    <Layout title="プロフィール編集">
      <div className="w-7/12 xl:w-5/12">
        <div className="my-10 text-center font-sans text-2xl tracking-widest text-gray-500 md:text-4xl">
          プロフィール編集
        </div>
        <SInput
          type="text"
          value={editedProfile?.username || ''}
          onChange={(e) => updateEditedProfile({ ...editedProfile, username: e.target.value })}
          label="あなたの名前"
          icon={<IconSmile />}
        />
        <ImgUploadButton changeEvent={() => {}}>
          <Avatar img={img} isSetting />
        </ImgUploadButton>
        <div className="m-auto my-10 w-7/12">
          <Button onClick={updateProfile} block className="rounded-full">
            {updateProfileMutation.isLoading ? '更新中...' : '更新'}
          </Button>
        </div>
      </div>
    </Layout>
  )
}
export default ProfileUpdate
