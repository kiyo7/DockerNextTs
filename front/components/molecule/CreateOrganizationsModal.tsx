//lib
import { CameraIcon, UserGroupIcon } from '@heroicons/react/outline'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { useRouter } from 'next/router'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//hooks
import { useDownloadUrl } from '../../hooks/useDownloadUrl'
import { useMutateMembers } from '../../hooks/mutate/useMutateMembers'
import { useMutateOrganizations } from '../../hooks/mutate/useMutateOrganizations'
import { useUploadGroupImg } from '../../hooks/useUploadGroupImg'

//components
import { ImgUploadButton } from '../atoms/ImgUploadButton'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SImage } from '../atoms/SImage'
import { SInput } from '../atoms/SInput'
import { Spinner } from '../atoms/Spinner'
import { toast } from 'react-toastify'

interface Props {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export const CreateOrganizationsModal: React.FC<Props> = ({ setIsOpenModal }) => {
  const session = useStore((state) => state.session)
  const editedOrganization = useStore((state) => state.editedOrganization)
  const updateEditedOrganization = useStore((state) => state.updateEditedOrganization)
  const { push } = useRouter()

  const { fullUrl: groupLogoUrl, isLoading } = useDownloadUrl(editedOrganization.logo, 'groupLogo')
  const { createOrganizations } = useMutateOrganizations()
  const { createMembers } = useMutateMembers()
  const { useMutateUploadPostImg } = useUploadGroupImg()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await createOrganizations
      .mutateAsync({
        groupname: editedOrganization.groupname,
        logo: editedOrganization.logo,
        administrator: session?.user?.id,
      })
      .then(() => {
        supabase
          .from('organizations')
          .select('*')
          .eq('administrator', session?.user?.id)
          .single()
          .then((data) => {
            createMembers.mutate({
              organization_id: data.data.id,
              member_id: session?.user?.id,
              invitation_status: 'Invited',
            })
          })
      })
      .catch(() => {
        toast.error('エラーやり直してください')
      })

    push('/dashBoard')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="w-ful card mx-5 border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-10 text-center">
            <p className="font-sans text-3xl tracking-widest text-gray-500 lg:text-4xl">
              グループを作成
            </p>
          </div>
          <div className="m-auto flex w-full items-center">
            <figure className="flex flex-col rounded-full hover:cursor-pointer hover:opacity-75">
              {!isLoading ? (
                <ImgUploadButton changeEvent={(e) => useMutateUploadPostImg.mutate(e)}>
                  <SImage
                    img={groupLogoUrl ? groupLogoUrl : undefined}
                    alt="groupLogo"
                    width={200}
                    height={200}
                    isSetting
                  />
                </ImgUploadButton>
              ) : (
                <Spinner />
              )}
              <CameraIcon className="h-5 text-gray-500" />
            </figure>
            <div>
              <SInput
                type="name"
                value={editedOrganization.groupname}
                onChange={(e) =>
                  updateEditedOrganization({ ...editedOrganization, groupname: e.target.value })
                }
                placeholder="グループ名"
                icon={<UserGroupIcon className="h-4 text-gray-500" />}
              />
            </div>
          </div>
          <div className="card-body items-center">
            <PrimaryButton buttonText={'作成する'} buttonColor="accent" />
          </div>
        </form>
      </div>
    </>
  )
}
