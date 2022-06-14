//lib
import create from 'zustand'
import { Session } from '@supabase/supabase-js'

interface State {
  session: Session | null
  setSession: (payload: Session | null) => void
  notice: boolean | null
  setNotice: (payload: boolean | null) => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  notice: false,
  setNotice: (payload) => set({ notice: payload }),
}))

export default useStore
