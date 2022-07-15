//lib
import Image, { StaticImageData } from 'next/image'

interface Props {
  heading: string
  tips: string
  img: StaticImageData
}

export const Independent: React.FC<Props> = ({ heading, tips, img }) => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="mt-16 tracking-wider">
          <p className="text-4xl font-bold text-gray-500">{heading}</p>
          <p className="py-6 text-xl text-gray-700">{tips}</p>
          <Image src={img} width={400} height={390} alt="image" />
        </div>
      </div>
    </div>
  )
}
