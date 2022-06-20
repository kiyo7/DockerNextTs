//lib
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'
import { toast } from 'react-toastify'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  const logoutMutation = useMutation(async () => {
    supabase.auth
      .signOut()
      .then(() => {
        resetProfile()
        queryClient.removeQueries('profile')
        toast.success('ログアウトしました')
      })
      .catch((err: any) => {
        throw new Error(err.message)
      })
  })

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
    registerGoogleAuthMutation,
    logoutMutation,
  }
}
