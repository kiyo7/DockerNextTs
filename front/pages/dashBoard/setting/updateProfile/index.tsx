//lib
import { Button, Input } from '@mantine/core'
import { IconSmile } from '@supabase/ui'
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
    if (editedProfile.username!.length > 6) {
      toast.error('名前は6文字に収めてください')
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
        <Input.Wrapper label="ユーザーネーム" className="text-left">
          <Input
            icon={<IconSmile />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateEditedProfile({ ...editedProfile, username: e.target.value })
            }
            placeholder="田中 三太郎"
            radius="md"
            value={editedProfile?.username || ''}
          />
        </Input.Wrapper>
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
          <Button
            radius="lg"
            size="xl"
            className="w-4/12 rounded-full bg-teal-400"
            onClick={handleUpdateProfile}
            disabled={!updateProfile}
          >
            {updateProfile.isLoading ? '更新中...' : '更新'}
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default ProfileUpdatePage
