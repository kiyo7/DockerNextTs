//lib
import create from 'zustand'
import { EditedProfile } from '../types'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

interface State {
  session: Session | null
  setSession: (payload: Session | null) => void

  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetProfile: () => void
}

const useStore = create<State>((set) => ({
  session: supabase.auth.session(),
  setSession: (payload) => set({ session: payload }),
  editedProfile: { username: '', isAdmin: false, avatar: '', updated_at: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        isAdmin: payload.isAdmin,
        avatar: payload.avatar,
      },
    }),
  resetProfile: () => set({ editedProfile: { username: '', isAdmin: false, avatar: '' } }),
}))

export default useStore
