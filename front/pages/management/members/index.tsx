//lib
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

//hooks
import { useMutateMembers } from '../../../hooks/mutate/useMutateMembers'
import { useQueryOrganizations } from '../../../hooks/query/useQueryOrganizations'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'
import { MemberList } from '../../../components/atom/MemberList'

//types
import { MemberLists } from '../../../types'

const MembersPage: NextPage = () => {
  const [members, setMembers] = useState<MemberLists[]>([])

  const { selectMembers } = useMutateMembers()
  const { data } = useQueryOrganizations()

  useEffect(() => {
    selectMembers
      .mutateAsync(data!.id)
      .then((data) => setMembers(data))
      .catch(() => toast.error('予期せぬエラーが発生しました'))
  }, [])

  return (
    <AdminLayout title="メンバー">
      <div className="w-full overflow-x-auto px-10 ">
        <table className="table w-full">
          <thead>
            <tr>
              <th>名前</th>
              <th>役割</th>
              <th>招待状況</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, key) => {
              return (
                <MemberList
                  key={key}
                  username={member.profiles.username}
                  avatar={member.profiles.avatar}
                  is_admin={member.profiles.is_admin}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default MembersPage
