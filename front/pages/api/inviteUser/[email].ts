//lib
import { NextApiRequest, NextApiResponse } from 'next/types'

//utils
import { supabase } from '../../../utils/supabase'
import { supabaseAdmin } from '../../../utils/supabaseAdmin'

//types
import { Mail } from '../../../types'

export default (async function InviteUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query

  const body = JSON.parse(req.body)

  if (typeof email !== 'string' && supabaseAdmin)
    res.status(500).json('予期せぬエラーが発生しました。もう一度お試しください')

  const { data, error } = await supabase.from('profiles').select('*').eq('email', email).single()

  const { data: userExist, error: userExistError } = await supabase
    .from('members')
    .select('organization_id, member_id')
    .match({ organization_id: body.organization_id, member_id: data?.id })

  if (userExist![0]) return res.status(400).json('すでに招待しています。相手の承認をお待ちください')

  if (data === null) return res.status(406).json('ユーザーが見つかりませんでした')

  if (error || userExistError)
    return res.status(404).json('予期せぬエラーが発生しました。もう一度お試しください')

  const result: Omit<Mail, 'id' | 'created_at'> = {
    sender_id: body.sender_id,
    address_id: data.id,
    organization_id: body.organization_id,
  }

  await supabase.from('mail').insert(result)

  await supabase.from('members').insert({
    organization_id: body.organization_id,
    member_id: data.id,
    invitation_status: 'Inviting',
  })

  return res.status(200).json('ユーザーを招待しました')
})
