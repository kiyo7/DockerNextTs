//lib
import Link from 'next/link'

interface Props {
  path: string
  contentsName: string
  icon: React.ReactNode
}

export const Menu: React.FC<Props> = ({ path, contentsName, icon }) => {
  return (
    <>
      <li className={'my-1 md:mx-2'}>
        <Link href={path}>
          <a>
            <span className="w-10">{icon}</span> {contentsName}
          </a>
        </Link>
      </li>
    </>
  )
}
