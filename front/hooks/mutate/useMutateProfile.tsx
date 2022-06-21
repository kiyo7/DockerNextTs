//lib
import { toast } from 'react-toastify'
import { useQueryClient, useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { Profile } from '../../types'

export const useMutateProfile = () => {
  const queryClient = useQueryClient()

  const createProfileMutation = useMutation(
    async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase.from('profiles').insert(profile)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData('profile', res[0])
        toast.success('登録完了')
      },
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )

  const updateProfileMutation = useMutation(
    async (profile: Omit<Profile, 'updated_at' | 'created_at' | 'isAdmin'>) => {
      const { data, error } = await supabase.from('profiles').update(profile).eq('id', profile.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData('profile', res[0])
        toast.success('プロフィールを編集しました')
      },
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )
  return { createProfileMutation, updateProfileMutation }
}
