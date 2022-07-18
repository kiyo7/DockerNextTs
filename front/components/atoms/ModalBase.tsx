import { IconMail, IconPlusCircle } from '@supabase/ui'
import { PrimaryButton } from './PrimaryButton'

import { SInput } from './SInput'

export const ModalBase: React.FC = () => {
  return (
    <>
      <div className="card w-11/12 bg-base-100 shadow-xl lg:w-6/12">
        <div className="card-body">
          <div className="mt-20">
            <SInput
              type="text"
              value={''}
              onChange={() => {}}
              placeholder="メールアドレス"
              icon={<IconMail />}
            />
          </div>
          <PrimaryButton icon={<IconPlusCircle />} buttonText="招待する" />
        </div>
      </div>
    </>
  )
}
