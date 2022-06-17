//lib
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

//hooks
import useStore from '../../store'

//utils
import { supabase } from '../../utils/supabase'

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
      onError: (err: any) => {
        alert(err.message)
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
      onError: (err: any) => {
        alert(err.message)
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
      onError: (err: any) => {
        alert(err.message)
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
