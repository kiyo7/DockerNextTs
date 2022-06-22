//lib
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'
import { toast } from 'react-toastify'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { push } = useRouter()

  const queryClient = useQueryClient()
  const resetProfile = useStore((state) => state.resetProfile)

  const reset = () => {
    setEmail('')
    setPassword('')
  }
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('ログイン成功')
      },
      onError: (err: any) => {
        toast.error(err.message)
        reset()
      },
    },
  )
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('アカウントを登録しました')
      },
      onError: (err: any) => {
        toast.error(err.message)
        reset()
      },
    },
  )

  const registerGoogleAuthMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({
        provider: 'google',
      })

      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('ログイン成功')
      },
      onError: (err: any) => {
        toast.error(err.message)
        reset()
      },
    },
  )

  const logoutMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        resetProfile()
        queryClient.removeQueries('profile')
        toast.success('ログアウトしました')
      },
      onError: (err: any) => {
        toast.error(err.message)
      },
    },
  )

  const passwordResetSendEmail = useMutation(
    async (email: string) => {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/resetPassword',
      })
      if (error) throw new Error(error.message)
    },

    {
      onSuccess: () => {
        toast.success('アドレスに再入力フォームを送信しました。')
        reset()
      },
      onError: (arr: any) => {
        toast.error(arr.message)
        reset()
      },
    },
  )

  const resetPassword = useMutation(
    async () => {
      const { error } = await supabase.auth.update({ password: password })
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('パスワードを再設定しました')
        reset()
        push('/')
      },
      onError: (arr: any) => {
        toast.error(arr.message)
        reset()
      },
    },
  )

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
    registerGoogleAuthMutation,
    logoutMutation,
    passwordResetSendEmail,
    resetPassword,
  }
}
