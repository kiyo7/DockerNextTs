//lib
import { Button, IconSmile } from '@supabase/ui'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

//hooks
import { useDownloadUrl } from '../../hooks/useDownloadUrl'
import { useMutateProfile } from '../../hooks/mutate/useMutateProfile'
import { useQueryProfile } from '../../hooks/query/useQueryProfile'
import { useUploadAvatarImg } from '../../hooks/useUploadAvatarImg'

//utils
import useStore from '../../store'

//components
import { SInput } from '../../components/atoms/SInput'

//components
import { SImage } from '../../components/atoms/SImage'
import { ImgUploadButton } from '../../components/atoms/ImgUploadButton'
import { Spinner } from '../../components/atoms/Spinner'
import { NextPage } from 'next'
import { Layout } from '../../components/organisms/Layout'

const ProfileUpdatePage: NextPage = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)

  const { updateProfile } = useMutateProfile()

  const { useMutateUploadAvatarImg } = useUploadAvatarImg()

  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(editedProfile.avatar, 'avatars')

  const { data } = useQueryProfile()

  const { push } = useRouter()

  const isEditingProfile = () => {
    if (editedProfile.username === data?.username && editedProfile.avatar === data?.avatar) {
      toast.error('変更がありません')
      return false
    }
    if (editedProfile.username === '') {
      toast.error('名前は最低一文字必要です')
      return false
    }
    return true
  }

  const handleUpdateProfile = () => {
    const result = isEditingProfile()
    if (result) {
      updateProfile.mutate({
        id: session?.user?.id,
        username: editedProfile.username,
        avatar: editedProfile.avatar,
      })
      push('/dashBoard')
    }
  }

  return (
    <Layout title="プロフィール編集" header="プロフィール編集">
      <div className="w-7/12 xl:w-5/12">
        <SInput
          type="text"
          value={editedProfile?.username || ''}
          onChange={(e) => updateEditedProfile({ ...editedProfile, username: e.target.value })}
          label="あなたの名前"
          icon={<IconSmile />}
        />
        {!isLoading ? (
          <ImgUploadButton changeEvent={(e) => useMutateUploadAvatarImg.mutate(e)}>
            <SImage img={avatarUrl ? avatarUrl : undefined} alt="avatar" isSetting />
          </ImgUploadButton>
        ) : (
          <Spinner />
        )}

        <div className="m-auto my-10 w-7/12">
          <Button onClick={handleUpdateProfile} block className="rounded-full">
            {updateProfile.isLoading ? '更新中...' : '更新'}
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default ProfileUpdatePage
