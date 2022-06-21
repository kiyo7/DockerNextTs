//lib
import Image from 'next/image'
import { PencilAltIcon } from '@heroicons/react/outline'

//images
import initImg from '../../images/initAvatar.png'

interface Props {
  img?: string
  width?: number
  height?: number
  isSetting?: boolean
}

export const Avatar: React.FC<Props> = ({
  img = initImg,
  width = 300,
  height = 300,
  isSetting = false,
}) => {
  return (
    <div className="relative my-10 text-center hover:cursor-pointer hover:opacity-60 ">
      <Image src={img} alt={'avatar'} width={width} height={height} className="rounded-full" />
      {isSetting && (
        <PencilAltIcon className="absolute top-2/4 left-2/4 z-10 m-auto  w-1/3 -translate-x-2/4 -translate-y-2/4 opacity-0 hover:opacity-80" />
      )}
    </div>
  )
}
