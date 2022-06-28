//lib
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { Member } from '../../types'

export const useMutateMembers = () => {
  const createMembersMutation = useMutation(
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

  return { createMembersMutation }
}
