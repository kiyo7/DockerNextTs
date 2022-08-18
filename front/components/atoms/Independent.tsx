//lib
import Image, { StaticImageData } from 'next/image'

interface Props {
  heading: string
  img: StaticImageData
  tips: string
}

export const Independent: React.FC<Props> = ({ heading, img, tips }) => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="mt-14 tracking-wider md:mt-8">
          <p className="text-4xl font-bold text-gray-500">{heading}</p>
          <p className="py-6 text-lg text-gray-500 md:text-xl">{tips}</p>
          <Image src={img} width={400} height={390} alt="image" />
        </div>
      </div>
    </div>
  )
}
