//lib
import Image, { StaticImageData } from 'next/image'
import { PencilAltIcon } from '@heroicons/react/outline'

//images
import initImg from '../../public/assets/logo.png'

interface Props {
  alt: string
  height?: number | string
  img?: string | StaticImageData
  isSetting?: boolean
  width?: number | string
}

export const SImage: React.FC<Props> = ({
  alt,
  height = 300,
  img,
  isSetting = false,
  width = 300,
}) => {
  return (
    <div className="relative my-10 text-center hover:cursor-pointer hover:opacity-75">
      <Image
        src={img ? img : initImg}
        alt={alt}
        width={width}
        height={height}
        className="rounded-full"
      />
      {isSetting && (
        <PencilAltIcon className="absolute top-2/4 left-2/4 z-10 m-auto  w-1/3 -translate-x-2/4 -translate-y-2/4 opacity-0 hover:opacity-75" />
      )}
    </div>
  )
}
