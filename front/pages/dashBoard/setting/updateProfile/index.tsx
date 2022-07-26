//lib
import { Button, IconSmile } from '@supabase/ui'
import { CameraIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

//hooks
import { useDownloadUrl } from '../../../../hooks/useDownloadUrl'
import { useMutateProfile } from '../../../../hooks/mutate/useMutateProfile'
import { useQueryProfile } from '../../../../hooks/query/useQueryProfile'
import { useUploadAvatarImg } from '../../../../hooks/useUploadAvatarImg'

//utils
import useStore from '../../../../store'

//components
import { ImgUploadButton } from '../../../../components/atoms/ImgUploadButton'
import { Layout } from '../../../../components/organisms/Layout'
import { SImage } from '../../../../components/atoms/SImage'
import { SInput } from '../../../../components/atoms/SInput'
import { Spinner } from '../../../../components/atoms/Spinner'

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
      <div className="m-auto mt-10 w-10/12 xl:w-5/12">
        <SInput
          type="text"
          value={editedProfile?.username || ''}
          onChange={(e) => updateEditedProfile({ ...editedProfile, username: e.target.value })}
          label="ユーザーネーム"
          icon={<IconSmile />}
        />
        <div className="m-auto w-6/12">
          {!isLoading ? (
            <ImgUploadButton changeEvent={(e) => useMutateUploadAvatarImg.mutate(e)}>
              <div className="flex flex-col justify-center">
                <SImage img={avatarUrl ? avatarUrl : undefined} alt="avatar" isSetting />
                <CameraIcon className="h-5 text-gray-500" />
              </div>
            </ImgUploadButton>
          ) : (
            <Spinner />
          )}
        </div>

        <div className="m-auto my-10 w-10/12">
          <Button onClick={handleUpdateProfile} block className="rounded-full">
            {updateProfile.isLoading ? '更新中...' : '更新'}
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default ProfileUpdatePage
