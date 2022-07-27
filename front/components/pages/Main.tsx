//lib
import { Suspense, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

//hooks
import { useSubscribeOrganization } from '../../hooks/subscribe/useSubscribeOrganization'

//utils
import { supabase } from '../../utils/supabase'
import useStore from '../../store'

//components
import { OrganizationCard } from '../molecule/OrganizationCard'
import { Spinner } from '../atoms/Spinner'

//types
import { Organization } from '../../types'

export const Main: React.FC = () => {
  useSubscribeOrganization()

  const [organizations, setOrganizations] = useState<Organization[]>([])
  const session = useStore((state) => state.session)
  const resetOrganization = useStore((state) => state.resetOrganization)

  const queryClient = useQueryClient()

  useEffect(() => {
    const getOrganizationsData = async () => {
      resetOrganization()
      localStorage.removeItem('currentOrganization')
      queryClient.removeQueries('organization')
      const { data } = await supabase
        .from('organizations')
        .select('*')
        .eq('administrator', session?.user?.id)
        .order('created_at', { ascending: true })
      setOrganizations(data!)
      console.log(data)
    }
    return () => {
      getOrganizationsData()
    }
  }, [])

  console.log(organizations)
  console.log(session)

  return (
    <div className="w-full">
      <ul className="menu rounded-box w-full bg-base-100 px-10">
        <li className="text-xs text-gray-400">
          <span>招待されているグループ(0)</span>
        </li>
        <li className="text-xs text-gray-400">
          <span>管理グループ({organizations.length})</span>
        </li>
        {organizations.length >= 1 && (
          <>
            <Suspense fallback={<Spinner />}>
              {organizations
                ? organizations?.map((organization) => {
                    return (
                      <OrganizationCard
                        key={organization.id}
                        id={organization.id}
                        groupname={organization.groupname}
                        logo={organization.logo}
                      />
                    )
                  })
                : null}
            </Suspense>
          </>
        )}
        <li className="text-xs text-gray-400">
          <span>所属グループ(0)</span>
        </li>
      </ul>
    </div>
  )
}
