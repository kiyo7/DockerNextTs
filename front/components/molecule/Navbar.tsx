//components
import { MainContents, ManagementContents } from './Contents'

interface Props {
  isManagement?: boolean
}

export const Navbar: React.FC<Props> = ({ isManagement = true }) => {
  return (
    <>
      <div className="bg-teal-500 ">
        {isManagement ? (
          <ManagementContents spStyle="flex-row justify-center text-white" />
        ) : (
          <MainContents spStyle="flex-row justify-center text-white" />
        )}
      </div>
    </>
  )
}
