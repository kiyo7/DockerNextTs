//lib
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { Member } from '../../types'

export const useMutateMembers = () => {
  const addMembers = useMutation(
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
      .select('invitation_status, member_id, profiles (username, avatar)')
      .eq('organization_id', id)

    if (error) throw new Error(error.message)

    return data
  })

  const getMembers = useMutation(async (info: { id: string; status: string }) => {
    const { data, error } = await supabase
      .from('members')
      .select('id, invitation_status, organizations (administrator, groupname, logo)')
      .match({
        member_id: info.id,
        invitation_status: info.status,
      })

    if (error) throw new Error(error.message)

    console.log(data)

    let array: any = []

    data.map((j) => {
      if (j.organizations.administrator !== supabase?.auth?.user()?.id) {
        array.push(j)
      }
    })

    return array
  })

  return { addMembers, selectMembers, getMembers }
}
