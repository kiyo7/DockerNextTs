//lib
import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface Props {
  active: boolean
  src: StaticImageData
  onClick: () => void
  role: string
}

export const RoleImage: React.FC<Props> = ({ active, src, onClick, role }) => {
  return (
    <div
      className={`flex flex-col border-2 text-center focus:animate-bound ${
        active ? 'border-green-600' : ''
      }`}
    >
      <Image
        src={src}
        onClick={onClick}
        width={250}
        height={250}
        className={`${active ? 'animate-bound' : ''} hover:cursor-pointer`}
        alt="roleImage"
      />
      <span className="my-5 font-sans text-xl tracking-widest text-gray-700 ">{role}</span>
    </div>
  )
}
