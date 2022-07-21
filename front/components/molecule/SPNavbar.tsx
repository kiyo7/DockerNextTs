//components
import { AdminContents } from './AdminContents'

export const SPNavbar: React.FC = () => {
  return (
    <>
      <div className="h-20 bg-teal-500 lg:hidden">
        <AdminContents spStyle="flex-row justify-center text-white" />
      </div>
    </>
  )
}
