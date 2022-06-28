//lib
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//types
import { Organization } from '../../types'

export const useMutateOrganizations = () => {
  const resetOrganizations = useStore((state) => state.resetOrganization)
  const createOrganizationsMutation = useMutation(
    async (organization: Omit<Organization, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('organizations').insert(organization)

      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        toast.success('グループを作成しました')
        resetOrganizations()
      },
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )

  const updateOrganizationsMutation = useMutation(
    async (organizations: Omit<Organization, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('organizations')
        .update(organizations)
        .eq('id', organizations.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        toast.success('グループを編集しました')
      },
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )
  return { createOrganizationsMutation, updateOrganizationsMutation }
}
