//lib
import { useState } from 'react'
import Image from 'next/image'
import { IconSmile, IconMail, IconKey } from '@supabase/ui'

//hooks
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'
import { useMutateProfile } from '../../hooks/mutate/useMutateProfile'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//components
import { ForgotPasswordModal } from '../organisms/ForgotPasswordModal'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SInput } from '../atoms/SInput'
import { Spinner } from '../atoms/Spinner'

//images
import authPageBG from '../../images/authPageBG.jpg'
import google from '../../images/googleAuth.png'

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
            username: editedProfile.username,
            avatar: editedProfile.avatar,
          })
          resetProfile()
        })
        .catch((err: any) => {
          console.log(err.message)
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
              <SInput
                type="text"
                value={editedProfile?.username || ''}
                onChange={(e) =>
                  updateEditedProfile({ ...editedProfile, username: e.target.value })
                }
                label="ユーザーネーム"
                placeholder="田中 三太郎"
                icon={<IconSmile />}
              />
            )}
            <SInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="メールアドレス"
              placeholder="example@email.com"
              icon={<IconMail />}
            />
            <SInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="パスワード (6文字以上)"
              placeholder="******"
              icon={<IconKey />}
            />
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
