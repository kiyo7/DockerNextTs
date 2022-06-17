//li
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

//utils
import useStore from '../store'

//hooks
import { useQueryProfile } from '../hooks/query/useQueryProfile'

//components
import { Spinner } from './atom/Spinner'
import { InitSetting } from './InitSetting'

export const DashBoard: React.FC = () => {
  const session = useStore((state) => state.session)

  const { data } = useQueryProfile()

  return (
    <div>
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
