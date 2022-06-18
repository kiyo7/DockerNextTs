//lib
import { ErrorBoundary } from 'react-error-boundary'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Suspense } from 'react'

//utils
import useStore from '../store'

//hooks
import { useQueryProfile } from '../hooks/query/useQueryProfile'

//components
import { Independent } from './atom/Independent'
import { Spinner } from './atom/Spinner'
import { ProfSetting } from './ProfSetting'

export const DashBoard: React.FC = () => {
  const session = useStore((state) => state.session)

  const { data } = useQueryProfile()

  return (
    <>
      {data ? (
        <div>
          {/* 仮 グループが存在した場合管理画面との分岐 */}
          <Independent />
        </div>
      ) : (
        <div className="">
          <ErrorBoundary
            fallback={<ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />}
          >
            <Suspense fallback={<Spinner />}>
              <ProfSetting />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </>
  )
}
