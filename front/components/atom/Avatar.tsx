//lib
import Image, { StaticImageData } from 'next/image'
import { PencilAltIcon } from '@heroicons/react/outline'

interface Props {
  img: StaticImageData
  width?: number
  height?: number
  isSetting?: boolean
}

export const Avatar: React.FC<Props> = ({ img, width = 300, height = 300, isSetting = false }) => {
  return (
    <div className="relative my-10 text-center hover:cursor-pointer hover:opacity-60 ">
      <Image src={img} width={width} height={height} className="rounded-full" />
      {isSetting && (
        <PencilAltIcon className="absolute top-2/4 left-2/4 z-10 m-auto  w-1/3 -translate-x-2/4 -translate-y-2/4 opacity-0 hover:opacity-80" />
      )}
    </div>
  )
}
