//components
import { RoleImage } from '../atoms/RoleImage'

//images
import employee from '../../public/assets/employee.png'
import manager from '../../public/assets/manager.png'

interface Props {
  selectRole: (bool: boolean) => void
  active: boolean
}

export const RoleSelect: React.FC<Props> = ({ selectRole, active }) => {
  return (
    <>
      <p className="my-4 text-gray-500">仕事の種類</p>
      <p className="text-sm text-red-400">※ 仕事の種類はあとで変更ができません! ※</p>
      <div className="mt-4 flex">
        <RoleImage src={manager} onClick={() => selectRole(true)} role={'管理者'} active={active} />
        <span className="mx-5" />
        <RoleImage
          src={employee}
          onClick={() => selectRole(false)}
          role={'従業員'}
          active={!active}
        />
      </div>
    </>
  )
}
