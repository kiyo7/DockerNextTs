//lib
import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { Profile, EditProfile } from '../types'

interface State {
  session: Session | null
  setSession: (payload: Session | null) => void
  notice: boolean | null
  setNotice: (payload: boolean | null) => void

  createProfile: Omit<Profile, 'created_at' | 'updated_at'>
  registerProfile: (payload: Omit<Profile, 'created_at' | 'updated_at'>) => void

  editedProfile: EditProfile
  updatedProfile: (payload: EditProfile) => void
  resetProfile: () => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  notice: false,
  setNotice: (payload) => set({ notice: payload }),
  createProfile: { id: '', username: '', isAdmin: null, avatar: '' },
  registerProfile: (payload) =>
    set({
      createProfile: {
        id: payload.id,
        username: payload.username,
        isAdmin: payload.isAdmin,
        avatar: payload.avatar,
      },
    }),
  editedProfile: { username: '', isAdmin: false, avatar: '', updated_at: '' },
  updatedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        isAdmin: payload.isAdmin,
        avatar: payload.avatar,
        updated_at: payload.updated_at,
      },
    }),
  resetProfile: () =>
    set({ editedProfile: { username: '', isAdmin: false, avatar: '', updated_at: '' } }),
}))

export default useStore
