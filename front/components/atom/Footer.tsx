//lib
import Image from 'next/image'
import { useEffect, useState } from 'react'

//images
import logo from '../../images/logo.png'

const YearOfCreation = 2022
export const Footer: React.FC = () => {
  const [year, setYear] = useState(0)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full bg-gray-100 p-5 text-center">
      <Image src={logo} width={40} height={40} alt="logo" />
      <div>
        <small className="text-xs text-gray-500">
          &copy;2022-{year === YearOfCreation ? '' : year} kiyo
        </small>
      </div>
    </footer>
  )
}
