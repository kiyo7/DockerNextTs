//lib
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

//utils
import { supabase } from '../utils/supabase'
import useStore from '../store'

export const useUploadGroupImg = () => {
  const editedOrganization = useStore((state) => state.editedOrganization)
  const updateEditedOrganization = useStore((state) => state.updateEditedOrganization)

  const useMutateUploadPostImg = useMutation(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('画像ファイルを選択して下さい!')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { error } = await supabase.storage.from('groupLogo').upload(filePath, file)

      if (error) throw new Error(error.message)
      updateEditedOrganization({ ...editedOrganization, logo: filePath })
    },
    {
      onError: (err: any) => {
        toast.error(err.message)
      },
    },
  )
  return { useMutateUploadPostImg }
}
