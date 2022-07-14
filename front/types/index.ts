export interface Profile {
  id: string | undefined
  username: string | undefined
  is_admin: boolean | null
  avatar: string | undefined
  created_at: string
  updated_at: string
}

export interface EditedProfile {
  username: string | undefined
  is_admin: boolean | null
  avatar: string | undefined
}

export interface Organization {
  id: string
  created_at: string
  administrator: string | undefined
  groupname: string
  logo: string
}

export interface EditedOrganization {
  id: string
  groupname: string
  logo: string
}

export interface Member {
  organization_id: string | undefined
  member_id: string | undefined
}

export interface ManagementContents {
  path: string
  contentsName: string
  icon: JSX.Element
}

export interface MemberLists {
  member_id: string
  profiles: {
    username: string
    avatar: string
    is_admin: boolean
  }
}
