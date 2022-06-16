export interface Profile {
  id: string | undefined
  username: string | undefined
  isAdmin: boolean | undefined
  avatar: string | undefined
  created_at: string
  updated_at: string
}

export interface EditedProfile {
  username: string | undefined
  isAdmin: boolean | undefined
  avatar: string | undefined
}
