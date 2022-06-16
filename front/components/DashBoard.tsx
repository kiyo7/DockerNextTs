import { Suspense } from 'react'
import { useQueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Spinner } from './atom/Spinner'
import { InitSetting } from './InitSetting'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useQueryProfile } from '../hooks/query/useQueryProfile'

export const DashBoard: React.FC = () => {
  const queryClient = useQueryClient()
  const resetProfile = useStore((state) => state.resetProfile)

  const session = useStore((state) => state.session)

  const { data } = useQueryProfile()

  const signOut = () => {
    supabase.auth
      .signOut()
      .then(() => {
        resetProfile()
        queryClient.removeQueries('profile')
      })
      .catch((err: any) => {
        throw new Error(err.message)
      })
  }

  return (
    <div>
      <LogoutIcon
        onClick={signOut}
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        data-testid="logout"
      />
      {data ? (
        <div>
          登録完了
          {data.username}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <ErrorBoundary
              fallback={<ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />}
            >
              <Suspense fallback={<Spinner />}>
                <InitSetting />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  )
}
