//lib
import Link from 'next/link'

interface Props {
  clickEvent?: () => void
  path?: string
  contentsName: string
  Icon: React.ReactNode
}

export const HeaderMenu: React.FC<Props> = ({ clickEvent, path, contentsName, Icon }) => {
  return (
    <>
      {path ? (
        <li className="my-1">
          <Link href={path}>
            <a>
              {Icon} {contentsName}
            </a>
          </Link>
        </li>
      ) : (
        <li className="my-1" onClick={clickEvent}>
          <p>
            {Icon} {contentsName}
          </p>
        </li>
      )}
    </>
  )
}
