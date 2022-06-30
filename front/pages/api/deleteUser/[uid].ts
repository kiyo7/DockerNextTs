//lib
import { NextApiRequest, NextApiResponse } from 'next/types'

//utils
import { supabaseAdmin } from '../../../utils/supabaseAdmin'

export default async function InviteUser(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query

  if (typeof uid === 'string' && supabaseAdmin) {
    const { data: user, error } = await supabaseAdmin.auth.api.deleteUser(uid.toString())
    if (error) {
      res.status(error.status).json(error)
    } else {
      res.status(200).json(user)
    }
  } else {
    res.status(500).json({
      error: 'unknown error occurred',
    })
  }
}
