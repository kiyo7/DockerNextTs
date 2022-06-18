//lib
import Image from 'next/image'

//images
import image from '../../images/noGroup.png'

export const Independent: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="mt-10">
          <p className="text-4xl font-bold text-gray-500">参加しているグループが見つかりません</p>
          <p className="py-6 text-gray-700">管理者からグループに招待してもらいましょう！</p>
          <Image src={image} width={400} height={400} />
        </div>
      </div>
    </div>
  )
}
