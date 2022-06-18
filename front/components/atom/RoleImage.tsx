//lib
import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface Props {
  src: StaticImageData
  onClick: () => void
  role: string
  active: boolean
}

export const RoleImage: React.FC<Props> = ({ src, onClick, role, active }) => {
  return (
    <div className={`flex flex-col border-2 text-center ${active ? 'border-green-600' : ''}`}>
      <Image
        src={src}
        onClick={onClick}
        width={250}
        height={250}
        className="hover:animate-bound hover:cursor-pointer"
      />
      <span className="my-5 font-sans text-xl tracking-widest text-gray-700 ">{role}</span>
    </div>
  )
}
