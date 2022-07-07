//components
import { Independent } from '../atom/Independent'

//images
import independent from '../../images/independent.png'

export const Employee: React.FC = () => {
  return (
    <Independent
      heading="参加しているグループが見つかりません"
      tips="管理者からグループに招待してもらいましょう！"
      img={independent}
    />
  )
}
