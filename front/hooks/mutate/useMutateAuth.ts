//lib
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { replace } = useRouter()

  const queryClient = useQueryClient()
  const setSession = useStore((state) => state.setSession)
  const resetProfile = useStore((state) => state.resetProfile)
  const resetOrganization = useStore((state) => state.resetOrganization)

  const dashBoardPath = 'dashBoard/'

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  const register = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('アカウントを登録しました')
        reset()
        replace(dashBoardPath)
      },
      onError: (err: any) => {
        toast.error(err.message)
        reset()
      },
    },
  )

  const login = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('ログイン成功')
        reset()
        replace(dashBoardPath)
      },
      onError: (err: any) => {
        toast.error(err.message)
        reset()
      },
    },
  )

  const googleAuth = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn(
        {
          provider: 'google',
        },
        {
          redirectTo: dashBoardPath,
        },
      )

      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        toast.success('ログイン成功')
        replace(dashBoardPath)
      },
      onError: (err: any) => {
        toast.error(err.message)
        reset()
      },
    },
  )

  const logout = useMutation(
    async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
    },
    {
      onSuccess: () => {
        resetProfile()
        resetOrganization()
        queryClient.removeQueries('profile')
        queryClient.removeQueries('organization')
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
        redirectTo: 'resetPassword/',
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
        replace(dashBoardPath)
      },
      onError: (arr: any) => {
        toast.error(arr.message)
        reset()
      },
    },
  )

  const userDelete = useMutation(async (id: string) => {
    if (id === '') {
      toast.error('予期せぬエラーが発生しました。時間を置いて再度お試しください')
      return
    }
    await fetch(`/api/deleteUser/${id}`)
      .then(() => {
        resetProfile()
        resetOrganization()
        queryClient.removeQueries('profile')
        queryClient.removeQueries('organization')
        setSession(null)

        toast.success('アカウント削除が完了しました。')
      })
      .catch((err: any) => toast.error(err.message))
  })

  const inviteUser = useMutation(async (email: string) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
    if (!email.match(pattern)) toast.error('有効なアドレスを入力してください')
    const user = supabase.auth.user()
    if (user?.email === email) toast.error('自分を招待することはできません')

    const organization_id = localStorage.getItem('currentOrganization')

    const params = {
      method: 'POST',
      body: JSON.stringify({ sender_id: supabase?.auth?.user()?.id, organization_id }),
    }
    await fetch(`/api/inviteUser/${email}`, params)
      .then(async (res) => {
        const message = await res.json()
        if (res.status === 200) {
          toast.success(message)
        } else {
          toast.error(message)
        }
      })
      .catch((err: any) => toast.error(err.message))
  })

  return {
    email,
    setEmail,
    password,
    setPassword,
    login,
    register,
    googleAuth,
    logout,
    passwordResetSendEmail,
    resetPassword,
    userDelete,
    inviteUser,
  }
}
