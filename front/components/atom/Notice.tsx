//lib
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

interface Props {
  situation: 'success' | 'error'
  message: string
}

const base = 'mr-4 h-6 w-6 fill-current'
const success = `${base} text-teal-500`
const error = `${base} text-red-500`

export const Notice: React.FC<Props> = ({ situation, message }) => {
  const theme = situation === 'success' ? 'teal' : 'red'
  return (
    <div
      className={`absolute top-20 z-10 w-3/12 animate-bounce rounded-lg border-t-4 border-${theme}-100 bg-${theme}-100 px-4 py-3 text-${theme}-500 shadow-md`}
      role="alert"
    >
      <div className="flex">
        <div>
          {situation === 'success' ? (
            <CheckCircleIcon className={success} />
          ) : (
            <ExclamationCircleIcon className={error} />
          )}
        </div>
        <div>
          <p className="tracking-widest">{message}</p>
        </div>
      </div>
    </div>
  )
}
