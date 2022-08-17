export interface Profile {
  id: string | undefined
  username: string | undefined
  email: string | undefined
  avatar: string | undefined
  created_at: string
  updated_at: string
}

export interface EditedProfile {
  username: string | undefined
  email?: string | undefined
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

export interface ContentsType {
  path: string
  contentsName: string
  Icon: JSX.Element
}

export interface MemberLists {
  member_id: string
  invitation_status: InviteStatus
  profiles: {
    username: string
    avatar: string
  }
}

export interface Mail {
  sender_id: string
  address_id: string
  organization_id: string
  created_at: string
}

export interface InviteMember {
  id: string
  invitation_status: InviteStatus
  organizations: Pick<Organization, 'administrator' | 'groupname' | 'logo'>
}
