//lib
import { Suspense, useState } from 'react'

//utils
import useStore from '../../store'

//hooks
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'
import { useSubscribeOrganization } from '../../hooks/subscribe/useSubscribeOrganization'

//components
import { CreateOrganizationsModal } from '../molecule/CreateOrganizationsModal'
import { IconPlusCircle } from '@supabase/ui'
import { Independent } from '../atoms/Independent'
import { OrganizationCard } from '../molecule/OrganizationCard'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { Spinner } from '../atoms/Spinner'

//images
import independent from '../../images/admin.png'

export const Admin: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const session = useStore((state) => state.session)

  useSubscribeOrganization()

  const modalOpen = () => {
    setIsOpenModal(true)
  }

  const { data } = useQueryOrganizations()

  if (isOpenModal)
    return (
      <div>
        <CreateOrganizationsModal setIsOpenModal={setIsOpenModal} />
      </div>
    )

  return (
    <>
      {data?.administrator === session?.user?.id ? (
        <>
          <Suspense fallback={<Spinner />}>
            <div className="my-12  flex w-full flex-col items-center">
              <h1 className="font-sans text-3xl tracking-widest">管理グループ</h1>
              <div className="mt-5 w-3/5 space-x-10 border border-double" />
            </div>
            <OrganizationCard />
          </Suspense>
        </>
      ) : (
        <div>
          <Independent
            heading="管理しているグループが見つかりません"
            tips="グループを作成し招待しましょう！"
            img={independent}
          />
          <div className="flex items-center justify-center">
            <PrimaryButton
              icon={<IconPlusCircle />}
              buttonText="グループを作成"
              clickEvent={modalOpen}
              buttonColor="accent"
            />
          </div>
        </div>
      )}
    </>
  )
}
