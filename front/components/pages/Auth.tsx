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

  const [isLogin, setIsLogin] = useState(true)

  const { email, setEmail, password, setPassword, login, register, googleAuth } = useMutateAuth()
  const { createProfile } = useMutateProfile()

  const handleClick = async () => {
    if (isLogin) {
      login.mutate()
    } else {
      register
        .mutateAsync()
        .then(() => {
          createProfile.mutate({
            id: supabase.auth.session()?.user?.id,
            username: editedProfile.username,
            avatar: editedProfile.avatar,
          })
        })
        .catch((err: any) => {
          console.log(err.message)
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
      <div className="relative w-screen bg-gray-200 lg:grid lg:grid-cols-2 lg:gap-2">
        <div className="hidden lg:block">
          <Image src={authPageBG} alt="img" layout="responsive" />
        </div>
        <div className="flex w-full flex-col">
          <div className="m-auto w-8/12">
            <div className="mb-10 pt-10 text-center">
              <p className="font-sans text-3xl text-gray-500 lg:text-4xl">
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
            <div className="text-center">
              <PrimaryButton
                buttonText={isLogin ? 'ログイン' : '新規登録'}
                clickEvent={handleClick}
                disabled={isDisable()}
              />
              <p
                onClick={() => setIsLogin(!isLogin)}
                className="mb-6 cursor-pointer font-sans text-lg font-medium text-indigo-400  hover:text-indigo-700"
              >
                {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
              </p>
            </div>
            <div className="m-auto w-8/12">
              <div className="mt-6 mb-3 w-full border border-dashed border-gray-400" />
              <div className="mx-4 font-sans text-sm font-medium  text-gray-500">
                SNSアカウントで登録・ログイン Google認証調整中のためお使いいただけません。
              </div>
              <button
                onClick={googleAuthMutation}
                data-testid="google"
                className=" flex w-full justify-center hover:cursor-pointer hover:opacity-75"
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
