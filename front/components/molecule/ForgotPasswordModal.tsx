//lib
import { Button, IconMail } from '@supabase/ui'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

//components
import { SInput } from '../atom/SInput'

export const ForgotPasswordModal: React.FC = () => {
  const { email, setEmail, passwordResetSendEmail } = useMutateAuth()

  return (
    <>
      <label
        className="cursor-pointer font-sans  font-medium text-indigo-400 hover:text-indigo-700"
        htmlFor="my-modal-4"
      >
        パスワードを忘れた
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative">
          <h3 className=" mx-2 font-sans text-2xl text-gray-500">パスワードの再設定</h3>
          <div className="my-10">
            <SInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="メールアドレス"
              placeholder="example@email.com"
              icon={<IconMail />}
            />
          </div>

          <Button
            onClick={() => passwordResetSendEmail.mutate(email)}
            block
            className="rounded-full"
          >
            {passwordResetSendEmail.isLoading ? 'メール送信中...' : '送信'}
          </Button>
        </label>
      </label>
    </>
  )
}
