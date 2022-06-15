export interface Profile {
  id: string | undefined
  username: string | undefined
  isAdmin: boolean | null
  avatar?: string | undefined
  created_at: string
  updated_at: string
}

export interface EditProfile {
  username: string | undefined
  isAdmin: boolean | undefined
  avatar: string | undefined
  updated_at: string
}
