//lib
import { NextPage } from 'next'

//components
import { Layout } from '../../components/Layout'
import { EditProfile } from '../../components/EditProfile'

const ProfileUpdate: NextPage = () => {
  return (
    <Layout title="プロフィール編集">
      <EditProfile />
    </Layout>
  )
}
export default ProfileUpdate
