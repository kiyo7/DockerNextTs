//lib
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { InviteMember, InviteStatus, Member } from '../../types'

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

  //招待ステータスを招待済みに変更
  const toggleInviteStatus = useMutation(async (member: { id: string; member_id: string }) => {
    const { data, error } = await supabase
      .from('members')
      .update({
        invitation_status: 'Invited',
      })
      .match({
        member_id: member.member_id,
        invitation_status: 'Inviting',
      })

    if (error) throw new Error(error.message)

    return data
  })

  //グループ内メンバーの取得
  const selectMembers = useMutation(async (id: string) => {
    const { data, error } = await supabase
      .from('members')
      .select('invitation_status, member_id, profiles (username, avatar)')
      .eq('organization_id', id)

    if (error) throw new Error(error.message)

    return data
  })

  //招待ステータスごとにデータの取得
  const getMembers = useMutation(async (member: { member_id: string; status: InviteStatus }) => {
    const { data, error } = await supabase
      .from('members')
      .select('id, invitation_status, organizations (administrator, groupname, logo)')
      .match({
        member_id: member.member_id,
        invitation_status: member.status,
      })

    if (error) throw new Error(error.message)

    let members: InviteMember[] = []

    data.map((d) => {
      if (d.organizations.administrator !== supabase?.auth?.user()?.id) {
        members.push(d)
      }
    })
    return members
  })

  return { addMembers, selectMembers, toggleInviteStatus, getMembers }
}
