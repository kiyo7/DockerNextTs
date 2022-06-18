//lib
import { Independent } from './atom/Independent'

//images
import img from '../images/admin.png'

export const Admin: React.FC = () => {
  return (
    <div>
      <Independent
        heading="管理しているグループが見つかりません"
        tips="グループを作成し招待しましょう！"
        img={img}
        isAdmin={true}
      />
    </div>
  )
}
