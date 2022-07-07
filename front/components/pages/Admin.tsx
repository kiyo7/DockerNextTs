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
import { Independent } from '../atom/Independent'
import { OrganizationCard } from '../molecule/OrganizationCard'
import { PrimaryButton } from '../atom/PrimaryButton'
import { Spinner } from '../atom/Spinner'

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
            />
          </div>
        </div>
      )}
    </>
  )
}
