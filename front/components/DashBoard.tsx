//hooks
import { useQueryProfile } from '../hooks/query/useQueryProfile'

//components
import { Admin } from './Admin'
import { Employee } from './Employee'
import { InitSetting } from './InitSetting'

export const DashBoard: React.FC = () => {
  const { data } = useQueryProfile()

  return <>{data ? <>{data.isAdmin ? <Admin /> : <Employee />}</> : <InitSetting />}</>
}
