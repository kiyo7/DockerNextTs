//lib
import create from 'zustand'
import { EditedOrganization, EditedProfile } from '../types'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

//types
import { Organization } from '../types'

interface State {
  session: Session | null
  setSession: (payload: Session | null) => void

  currentOrganization: Pick<Organization, 'id'>
  setCurrentOrganization: (payload: Pick<Organization, 'id'>) => void

  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetProfile: () => void

  editedOrganization: EditedOrganization
  updateEditedOrganization: (payload: EditedOrganization) => void
  resetOrganization: () => void
}

const useStore = create<State>((set) => ({
  session: supabase.auth.session(),
  setSession: (payload) => set({ session: payload }),

  currentOrganization: { id: '' },
  setCurrentOrganization: (payload) =>
    set({
      currentOrganization: {
        id: payload.id,
      },
    }),

  editedProfile: { username: '', avatar: '', updated_at: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar: payload.avatar,
      },
    }),
  resetProfile: () => set({ editedProfile: { username: '', avatar: '' } }),

  editedOrganization: { id: '', groupname: '', logo: '' },
  updateEditedOrganization: (payload) =>
    set({
      editedOrganization: {
        id: payload.id,
        groupname: payload.groupname,
        logo: payload.logo,
      },
    }),
  resetOrganization: () => set({ editedOrganization: { id: '', groupname: '', logo: '' } }),
}))

export default useStore
