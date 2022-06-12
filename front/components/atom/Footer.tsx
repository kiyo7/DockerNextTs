import logo from '../../images/logo.png'
import Image from 'next/image'

const copyright = () => {
  const YearOfCreation = 2022
  const year = new Date().getFullYear()
  if (year !== YearOfCreation) return year
}

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 p-2 text-center">
      <Image src={logo} width={40} height={40} />
      <div>
        <small className="text-xs text-gray-500">&copy;2022-{copyright()} kiyo</small>
      </div>
    </footer>
  )
}
