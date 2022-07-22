//lib
import { IconMail, IconPlusCircle } from '@supabase/ui'

//hooks
import { UseMutationResult } from 'react-query'

//components
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SInput } from '../atoms/SInput'
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

export const InviteCard: React.FC = () => {
  const { email, setEmail, inviteUser } = useMutateAuth()

  const clickEvent = () => {
    inviteUser.mutate(email)
  }

  return (
    <>
      <div className="card w-11/12 bg-base-100 shadow-xl lg:w-6/12">
        <div className="card-body">
          <div className="mt-20">
            <SInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
              icon={<IconMail />}
            />
          </div>
          <PrimaryButton
            icon={<IconPlusCircle />}
            buttonText="招待する"
            buttonColor="accent"
            clickEvent={clickEvent}
          />
        </div>
      </div>
    </>
  )
}
