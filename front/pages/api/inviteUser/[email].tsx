// //lib
// import { NextApiRequest, NextApiResponse } from 'next/types'

// //utils
// import { supabaseAdmin } from '../../../utils/supabaseAdmin'

// export default (async function InviteUser(req: NextApiRequest, res: NextApiResponse) {
//   const { email } = req.query
//   if (typeof email === 'string' && supabaseAdmin) {
//     const { data, error } = await supabaseAdmin.auth.api.inviteUserByEmail(email)
//     if (error) {
//       res.status(error.status).json(error)
//     } else {
//       res.status(200).json(data)
//     }
//   } else {
//     res.status(500).json({
//       error: 'unknown error occurred',
//     })
//   }
// })

export {}
