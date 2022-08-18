//lib
import { useState } from 'react'
import { IconSmile, IconMail, IconKey } from '@supabase/ui'
import { Input, PasswordInput } from '@mantine/core'
import Image from 'next/image'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'
import { useMutateProfile } from '../../hooks/mutate/useMutateProfile'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//components
import { ForgotPasswordModal } from '../organisms/ForgotPasswordModal'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { Spinner } from '../atoms/Spinner'

//images
import authPageBG from '../../public/assets/authPageBG.jpg'
import google from '../../public/assets/googleAuth.png'

export const Auth: React.FC = () => {
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)
  const resetProfile = useStore((state) => state.resetProfile)

  const [isLogin, setIsLogin] = useState(true)

  const { email, setEmail, password, setPassword, login, register, googleAuth } = useMutateAuth()
  const { createProfile } = useMutateProfile()

  const handleClick = async () => {
    if (isLogin) {
      login.mutate()
      resetProfile()
    } else {
      register
        .mutateAsync()
        .then(() => {
          createProfile.mutate({
            id: supabase.auth.session()?.user?.id,
            email: email,
            username: editedProfile.username,
            avatar: editedProfile.avatar,
          })
          resetProfile()
        })
        .catch((err: any) => {
          resetProfile()
        })
    }
  }

  const isDisable = () => {
    if (isLogin) {
      return email === '' || password === ''
    } else {
      return email === '' || password === '' || editedProfile.username === ''
    }
  }

  const googleAuthMutation = async () => {
    googleAuth.mutate()
  }

  if (login.isLoading || register.isLoading || googleAuth.isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="grid min-h-screen w-full bg-gray-200 lg:grid-cols-2 lg:gap-2">
        <div className="hidden lg:block">
          <Image src={authPageBG} alt="img" layout="responsive" />
        </div>
        <div className="flex w-full flex-col">
          <div className="m-auto w-8/12">
            <div className="mb-8 mt-10 text-center">
              <p className="pt-10 text-center text-2xl md:text-4xl">
                {isLogin ? 'ログイン' : '新規登録'}
              </p>
            </div>
            {!isLogin && (
              <Input.Wrapper label="ユーザーネーム" className="text-left">
                <Input
                  icon={<IconSmile />}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateEditedProfile({ ...editedProfile, username: e.target.value })
                  }
                  placeholder="田中 三太郎"
                  radius="md"
                  value={editedProfile?.username || ''}
                />
              </Input.Wrapper>
            )}

            <Input.Wrapper label="メールアドレス" className="my-8 text-left">
              <Input
                icon={<IconMail />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="example@email.com"
                radius="md"
                value={email}
              />
            </Input.Wrapper>
            <Input.Wrapper label="パスワード (6文字以上)" className="text-left">
              <PasswordInput
                icon={<IconKey />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="******"
                radius="md"
                required
                value={password}
              />
            </Input.Wrapper>
            {isLogin && (
              <div className="my-6 flex justify-end text-sm">
                <ForgotPasswordModal />
              </div>
            )}
            <div className="items-center">
              <PrimaryButton
                buttonText={isLogin ? 'ログイン' : '新規登録'}
                clickEvent={handleClick}
                disabled={isDisable()}
              />
              <p
                onClick={() => setIsLogin(!isLogin)}
                className="text-md mb-6 cursor-pointer font-sans font-medium text-indigo-400  hover:text-indigo-700"
              >
                {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
              </p>
            </div>
            <div className="m-auto w-8/12">
              <button
                onClick={googleAuthMutation}
                data-testid="google"
                className="hover:cursor-pointer hover:opacity-75"
              >
                <Image src={google} alt="google" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
