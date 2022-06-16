//lib
import { useQuery } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//types
import { Profile } from '../../types'

export const useQueryProfile = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)

  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id)
      .single()

    updateEditedProfile({
      ...editedProfile,
    })

    if (error && status !== 406) {
      throw new Error(error.message)
    }
    return data
  }

  return useQuery<Profile, Error>({
    queryKey: 'profile',
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        updateEditedProfile({
          username: data.username,
          isAdmin: false,
          avatar: data.avatar,
        })
      }
    },
  })
}
