//lib
import { ErrorBoundary } from 'react-error-boundary'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Suspense } from 'react'

//utils
import useStore from '../store'

//hooks
import { useQueryProfile } from '../hooks/query/useQueryProfile'

//components
import { Admin } from './Admin'
import { Independent } from './atom/Independent'
import { Spinner } from './atom/Spinner'
import { ProfSetting } from './ProfSetting'

//images
import img from '../images/independent.png'

export const DashBoard: React.FC = () => {
  const session = useStore((state) => state.session)

  const { data } = useQueryProfile()

  return (
    <>
      {data ? (
        <>
          {data.isAdmin ? (
            <>
              <Admin />
            </>
          ) : (
            <div>
              {/* <Employee とか作ってその中で所属の有無で分岐> */}
              <Independent
                heading="参加しているグループが見つかりません"
                tips="管理者からグループに招待してもらいましょう！"
                img={img}
              />
            </div>
          )}
        </>
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
