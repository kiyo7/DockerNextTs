//lib
import Link from 'next/link'

interface Props {
  clickEvent?: () => void
  path?: string
  contentsName: string
  icon: React.ReactNode
}

export const Menu: React.FC<Props> = ({ clickEvent, path, contentsName, icon }) => {
  return (
    <>
      {path ? (
        <li className={'my-1'}>
          <Link href={path}>
            <a>
              {icon} {contentsName}
            </a>
          </Link>
        </li>
      ) : (
        <li className={'my-1'} onClick={clickEvent}>
          <p>
            {icon} {contentsName}
          </p>
        </li>
      )}
    </>
  )
}
