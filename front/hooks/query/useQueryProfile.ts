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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id)
      .single()

    updateEditedProfile({
      ...editedProfile,
    })

    // if (error) throw new Error(error.message)
    //新規作成時にここでエラーが発生するため仮でコメントアウト

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
          isAdmin: data.isAdmin,
          avatar: data.avatar,
        })
      }
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
