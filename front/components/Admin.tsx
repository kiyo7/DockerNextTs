//lib
import { useState } from 'react'

//hooks
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import { useQueryOrganizations } from '../hooks/query/useQueryOrganizations'

//utils
import useStore from '../store'

//components
import { CreateOrganizationsModal } from './molecule/CreateOrganizationsModal'
import { IconPlusCircle } from '@supabase/ui'
import { Independent } from './atom/Independent'
import { PrimaryButton } from './atom/PrimaryButton'
import { SImage } from './atom/SImage'

//images
import img from '../images/admin.png'

export const Admin: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const editedOrganization = useStore((state) => state.editedOrganization)

  const modalOpen = () => {
    setIsOpenModal(true)
  }

  const { data } = useQueryOrganizations()
  const { fullUrl: logoUrl, isLoading } = useDownloadUrl(data?.logo, 'groupLogo')
  console.log(isLoading)

  console.log(data)

  if (isOpenModal)
    return (
      <div>
        <CreateOrganizationsModal setIsOpenModal={setIsOpenModal} />
      </div>
    )

  return (
    <>
      {data ? (
        <>
          <div className="my-12 flex w-full flex-col items-center">
            <h1 className="font-sans text-3xl tracking-widest">管理グループ</h1>
            <div className="mt-5 w-3/5 space-x-10 border border-double" />
          </div>
          <div className="card z-0 my-10 w-96 bg-base-100 shadow-xl">
            <figure>
              <SImage
                img={logoUrl ? logoUrl : undefined}
                width={200}
                height={200}
                alt="groupLogo"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title ">
                <span className="mt-3 font-sans text-3xl font-medium">{data.groupname}</span>
              </h2>
              <div className="card-actions justify-end hover:cursor-pointer hover:opacity-75">
                <PrimaryButton buttonText={'管理画面へ'} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Independent
            heading="管理しているグループが見つかりません"
            tips="グループを作成し招待しましょう！"
            img={img}
          />
          <div className="flex items-center justify-center">
            <PrimaryButton
              icon={<IconPlusCircle />}
              buttonText="グループを作成"
              clickEvent={modalOpen}
            />
          </div>
        </div>
      )}
    </>
  )
}
