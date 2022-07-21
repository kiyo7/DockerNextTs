//lib
import { IconMail, IconPlusCircle } from '@supabase/ui'

//components
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SInput } from '../atoms/SInput'

export const InviteCard: React.FC = () => {
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
          <PrimaryButton icon={<IconPlusCircle />} buttonText="招待する" buttonColor="accent" />
        </div>
      </div>
    </>
  )
}
