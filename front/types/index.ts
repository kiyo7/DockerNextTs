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

export type InviteStatus = 'Inviting' | 'Invited'

export interface Member {
  organization_id: string | undefined
  member_id: string | undefined
  invitation_status: InviteStatus
}

export interface ManagementContents {
  path: string
  contentsName: string
  icon: JSX.Element
}

export interface MemberLists {
  member_id: string
  invitation_status: InviteStatus
  profiles: {
    username: string
    avatar: string
    is_admin: boolean
  }
}
