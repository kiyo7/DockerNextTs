//lib
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

//utils
import { supabase } from '../../utils/supabase'

//types
import { Organization } from '../../types'

export const useSubscribeOrganization = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('organizations')
      .on('INSERT', (payload: SupabaseRealtimePayload<Organization>) => {
        let previousOrganization = queryClient.getQueryData<Organization>('organization')
        if (!previousOrganization) {
          previousOrganization = undefined
        }
        queryClient.setQueryData('organization', {
          id: payload.new.id,
          created_at: payload.new.created_at,
          administrator: payload.new.administrator,
          groupname: payload.new.groupname,
          logo: payload.new.logo,
        })
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Organization>) => {
        let previousOrganization = queryClient.getQueryData<Organization>('organization')
        if (!previousOrganization) {
          previousOrganization = undefined
        }
        queryClient.setQueryData('organization', {
          id: payload.new.id,
          created_at: payload.new.created_at,
          administrator: payload.new.administrator,
          groupname: payload.new.groupname,
          logo: payload.new.logo,
        })
      })
      .on('DELETE', () => {
        let previousOrganization = queryClient.getQueryData<Organization[]>('organization')
        if (!previousOrganization) {
          previousOrganization = undefined
        }
        queryClient.setQueryData('organization', null)
      })
      .subscribe()

    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
