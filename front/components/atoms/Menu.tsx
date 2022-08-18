//lib
import Link from 'next/link'

interface Props {
  contentsName: string
  icon: React.ReactNode
  path: string
}

export const Menu: React.FC<Props> = ({ contentsName, icon, path }) => {
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
