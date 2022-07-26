//lib
import { toast } from 'react-toastify'
import { useQueryClient, useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { Profile } from '../../types'

export const useMutateProfile = () => {
  const queryClient = useQueryClient()

  const createProfile = useMutation(
    async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase.from('profiles').insert(profile)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData('profile', res[0])
      },
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )

  const updateProfile = useMutation(
    async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
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
  return { createProfile, updateProfile }
}
