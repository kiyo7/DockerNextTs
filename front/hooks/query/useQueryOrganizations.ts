//lib
import { useQuery } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//types
import { Organization } from '../../types'

export const useQueryOrganizations = () => {
  const session = useStore((state) => state.session)
  const editedOrganizations = useStore((state) => state.editedOrganization)
  const updateEditedOrganizations = useStore((state) => state.updateEditedOrganization)

  const getOrganizations = async () => {
    const { data, error, status } = await supabase
      .from('organizations')
      .select('*')
      .eq('administrator', session?.user?.id)
      .single()

    if (status === 406) return

    if (error) throw new Error(error.message)

    updateEditedOrganizations({
      ...editedOrganizations,
    })

    return data
  }

  return useQuery<Organization, Error>({
    queryKey: 'organization',
    queryFn: getOrganizations,
    staleTime: Infinity,
  })
}
