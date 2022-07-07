//lib
import { useQuery } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//types
import { Profile } from '../../types'
import { toast } from 'react-toastify'

export const useQueryProfile = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)

  const getProfile = async () => {
    if (session) {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single()

      if (status === 406) return

      if (error) throw new Error(error.message)

      updateEditedProfile({
        ...editedProfile,
      })

      return data
    }
  }

  return useQuery<Profile, Error>({
    queryKey: 'profile',
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        updateEditedProfile({
          username: data.username,
          is_admin: data.is_admin,
          avatar: data.avatar,
        })
      }
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
