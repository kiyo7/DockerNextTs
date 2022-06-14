//lib
import Image from 'next/image'

//image
import logo from '../../images/headerLogo.png'

export const Header = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-4">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Image src={logo} width={40} height={40} />
        <span className="text-xl font-semibold tracking-tight">Shifty</span>
      </div>
    </nav>
  )
}
