//lib
import { Button, IconMail } from '@supabase/ui'
import { Input } from '@mantine/core'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

export const ForgotPasswordModal: React.FC = () => {
  const { email, setEmail, passwordResetSendEmail } = useMutateAuth()

  return (
    <>
      <label
        className="cursor-pointer font-sans font-medium text-indigo-400 hover:text-indigo-700"
        htmlFor="my-modal-4"
      >
        パスワードを忘れた
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative">
          <h3 className="mx-2 font-sans text-2xl text-gray-500">パスワードの再設定</h3>
          <div className="my-10">
            <Input.Wrapper label="メールアドレス" className="text-left">
              <Input
                icon={<IconMail />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                }}
                placeholder="example@email.com"
                radius="md"
                value={email}
              />
            </Input.Wrapper>
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
