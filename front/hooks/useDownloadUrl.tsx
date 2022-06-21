//lib
import { useState, useEffect } from 'react'

//utils
import { supabase } from '../utils/supabase'

export const useDownloadUrl = (filePath: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')

  useEffect(() => {
    if (filePath) {
      const download = async () => {
        setIsLoading(true)
        const { data, error } = await supabase.storage.from('avatars').download(filePath)

        if (error) {
          setIsLoading(false)
          throw error
        }
        setFullUrl(URL.createObjectURL(data!))
        setIsLoading(false)
      }
      download()
    }
  }, [filePath])

  return { isLoading, fullUrl, setFullUrl }
}
