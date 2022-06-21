//lib
import { ToastContainer, ToastPosition, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  position?: ToastPosition
  autoClose?: number
}

export const Notice: React.FC<Props> = ({ position = 'top-center', autoClose = 1000 }) => {
  const contextClass = {
    success: 'bg-blue-600',
    error: 'bg-red-600',
    info: 'bg-gray-700',
    warning: 'bg-orange-400',
    default: 'bg-black text-white ',
    dark: 'bg-white text-gray-600',
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
      bodyClassName={() => ' flex  text-sm font-md block p-3'}
    />
  )
}
