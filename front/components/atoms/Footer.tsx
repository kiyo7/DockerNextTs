//lib
import Image from 'next/image'
import { useEffect, useState } from 'react'

//images
import logo from '../../public/assets/logo.png'

const YearOfCreation = 2022
export const Footer: React.FC = () => {
  const [year, setYear] = useState(0)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="h-20 bg-gray-100 p-3 text-center">
      <Image src={logo} width={35} height={35} alt="logo" />
      <div>
        <small className="text-xs text-gray-500">
          &copy;2022-{year === YearOfCreation ? '' : year} kiyo
        </small>
      </div>
    </div>
  )
}
