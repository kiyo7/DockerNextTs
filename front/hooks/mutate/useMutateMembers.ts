//lib
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { Member } from '../../types'

export const useMutateMembers = () => {
  const createMembers = useMutation(
    async (member: Member) => {
      const { data, error } = await supabase.from('members').insert(member)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )

  const selectMembers = useMutation(async (id: string) => {
    const { data, error } = await supabase
      .from('members')
      .select('member_id, profiles (username, avatar, is_admin)')
      .eq('organization_id', id)

    if (error) throw new Error(error.message)

    return data
  })

  return { createMembers, selectMembers }
}
