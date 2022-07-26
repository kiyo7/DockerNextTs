//lib
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

//hooks
import { useMutateMembers } from '../../../hooks/mutate/useMutateMembers'

//components
import { AdminLayout } from '../../../components/organisms/AdminLayout'
import { MemberList } from '../../../components/atoms/MemberList'

//types
import { MemberLists } from '../../../types'

const MembersPage: NextPage = () => {
  const [members, setMembers] = useState<MemberLists[]>([])

  const { selectMembers } = useMutateMembers()

  useEffect(() => {
    const id = localStorage.getItem('currentOrganization')
    selectMembers
      .mutateAsync(id!)
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
              <th>参加状況</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              return (
                <MemberList
                  key={member.member_id}
                  id={member.member_id}
                  username={member.profiles.username}
                  avatar={member.profiles.avatar}
                  invitation_status={member.invitation_status}
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
