//lib
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//types
import { Organization } from '../../types'

export const useMutateOrganizations = () => {
  const resetOrganization = useStore((state) => state.resetOrganization)
  const { push } = useRouter()

  const createOrganizations = useMutation(
    async (organization: Omit<Organization, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('organizations').insert(organization)

      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        toast.success('グループを作成しました')
        resetOrganization()
      },
      onError: (err: any) => {
        toast.error(err.messages)
      },
    },
  )

  const updateOrganizations = useMutation(
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
        toast.error(err.message)
      },
    },
  )

  const deleteOrganizations = useMutation(
    async (id: string = '') => {
      if (id === '') return
      const { data, error } = await supabase.from('organizations').delete().eq('id', id)

      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        toast.success('グループを削除しました')
        resetOrganization()
        push('/dashBoard')
      },
      onError: (err: any) => {
        toast.error(err.message)
        resetOrganization()
      },
    },
  )
  return { createOrganizations, updateOrganizations, deleteOrganizations }
}
