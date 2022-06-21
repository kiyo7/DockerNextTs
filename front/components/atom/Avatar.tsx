//lib
import Image, { StaticImageData } from 'next/image'

interface Props {
  img: StaticImageData
}

export const Avatar: React.FC<Props> = ({ img }) => {
  return (
    <div className="my-10 text-center hover:cursor-pointer hover:opacity-60">
      <Image src={img} width={300} height={300} className="rounded-full" />
    </div>
  )
}
