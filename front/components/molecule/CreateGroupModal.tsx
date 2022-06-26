//lib
import { CameraIcon, UserGroupIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

//components
import { PrimaryButton } from '../atom/PrimaryButton'
import { SImage } from '../atom/SImage'
import { SInput } from '../atom/SInput'

interface Props {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export const CreateGroupModal: React.FC<Props> = ({ setIsOpenModal }) => {
  const { push } = useRouter()

  const handleSubmit = () => {
    setIsOpenModal(false)
    push('/')
    toast.success('グループを作成しました')
  }

  return (
    <>
      <div className="w-ful card mx-5 border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-10 text-center">
            <p className="font-sans text-3xl  tracking-widest text-gray-500 lg:text-4xl">
              グループを作成
            </p>
          </div>
          <div className="m-auto flex w-full items-center">
            <figure className="flex flex-col rounded-full hover:cursor-pointer hover:opacity-75">
              <SImage width={'100%'} height={'100%'} alt="GroupImage" />
              <div>
                <CameraIcon className="h-5 text-gray-500" />
              </div>
            </figure>
            <div>
              <SInput
                type="name"
                value={''} //仮
                onChange={() => {}}
                placeholder="グループ名"
                icon={<UserGroupIcon className="h-4 text-gray-500 " />}
              />
            </div>
          </div>
          <div className="card-body items-center">
            <PrimaryButton buttonText={'作成する'} type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}
