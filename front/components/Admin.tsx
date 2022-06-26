//lib
import { useState } from 'react'

//components
import { CreateGroupModal } from './molecule/CreateGroupModal'
import { IconPlusCircle } from '@supabase/ui'
import { Independent } from './atom/Independent'
import { PrimaryButton } from './atom/PrimaryButton'

//images
import img from '../images/admin.png'

export const Admin: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const modalOpen = () => {
    setIsOpenModal(true)
  }

  return (
    <>
      {isOpenModal ? (
        <div className="">
          <CreateGroupModal setIsOpenModal={setIsOpenModal} />
        </div>
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
