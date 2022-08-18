//lib
import { ToastContainer, ToastPosition, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  autoClose?: number
  position?: ToastPosition
}

export const Notice: React.FC<Props> = ({ autoClose = 1000, position = 'top-center' }) => {
  const contextClass = {
    error: 'bg-red-600',
    dark: 'bg-white text-gray-600',
    default: 'bg-black text-white ',
    info: 'bg-gray-700',
    success: 'bg-blue-600',
    warning: 'bg-orange-400',
  }
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Bounce}
      closeButton={false}
      toastClassName={() =>
        contextClass['info'] +
        ' relative flex p-1 min-h-10 rounded-md justify-between m-2 cursor-pointer'
      }
      bodyClassName={() => ' flex text-sm font-md block p-3'}
    />
  )
}
