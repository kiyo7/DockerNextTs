//lib
import Image from 'next/image'
import { PencilAltIcon } from '@heroicons/react/outline'

//images
import initImg from '../../images/initAvatar.png'

interface Props {
  img?: string
  alt: string
  width?: number | string
  height?: number | string
  isSetting?: boolean
}

export const SImage: React.FC<Props> = ({
  img = initImg,
  alt,
  width = 300,
  height = 300,
  isSetting = false,
}) => {
  return (
    <div className="relative my-10 text-center hover:cursor-pointer hover:opacity-60 ">
      <Image src={img} alt={alt} width={width} height={height} className="rounded-full" />
      {isSetting && (
        <PencilAltIcon className="absolute top-2/4 left-2/4 z-10 m-auto  w-1/3 -translate-x-2/4 -translate-y-2/4 opacity-0 hover:opacity-75" />
      )}
    </div>
  )
}
