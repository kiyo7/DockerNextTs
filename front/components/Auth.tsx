//lib
import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { IconMail, IconKey } from '@supabase/ui'

//images
import authPageBG from '../images/authPageBG.jpg'
import googleAuth from '../images/googleAuth.png'

//utils
import { useMutateAuth } from '../hooks/mutate/useMutateAuth'

//components
import { SInput } from './atom/Input'
import { Spinner } from './atom/Spinner'

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
    registerGoogleAuthMutation,
  } = useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  const googleAuthMutation = async () => {
    registerGoogleAuthMutation.mutate()
  }

  if (
    loginMutation.isLoading ||
    registerMutation.isLoading ||
    registerGoogleAuthMutation.isLoading
  ) {
    return <Spinner />
  }

  return (
    <>
      <div className="grid h-full w-full grid-cols-2 gap-2 bg-gray-200">
        <Image src={authPageBG} alt="img" />
        <div className=" flex items-center justify-center">
          <form onSubmit={handleSubmit} className=" w-8/12">
            <div className=" mb-10 text-center">
              <p className="font-sans text-4xl text-gray-500">
                {isLogin ? 'ログイン' : '新規登録'}
              </p>
            </div>
            <div>
              <SInput
                type="text"
                value={email}
                onChange={setEmail}
                label="メールアドレス"
                placeholder="example@email.com"
                icon={<IconMail />}
              />
            </div>
            <div>
              <SInput
                type="password"
                value={password}
                onChange={setPassword}
                label="パスワード (6文字以上)"
                placeholder="******"
                icon={<IconKey />}
              />
            </div>
            <div className="my-6 flex justify-end text-sm">
              <span
                onClick={() => console.log('test')}
                className="cursor-pointer font-sans  font-medium text-indigo-400 hover:text-indigo-700"
              >
                {isLogin && 'パスワードを忘れた'}
              </span>
            </div>
            <button
              type="submit"
              disabled={false}
              className="flex w-full justify-center rounded-md bg-green-600 py-2 px-4 text-sm tracking-widest text-white hover:opacity-75 disabled:bg-gray-500 "
            >
              {isLogin ? 'ログイン' : '新規登録'}
            </button>
            <div className="mt-6 mb-3 w-full border border-dashed border-gray-400" />
            <div className="mx-4 font-sans text-sm font-medium  text-gray-500">
              SNSアカウントで登録・ログイン
            </div>
            <button
              onClick={googleAuthMutation}
              data-testid="google"
              className="mt-8 flex w-full justify-center hover:cursor-pointer hover:opacity-60"
            >
              <Image src={googleAuth} alt="google" />
            </button>
            <div className="mt-5 flex justify-center">
              <p
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer font-sans font-medium text-indigo-400  hover:text-indigo-700"
              >
                {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
