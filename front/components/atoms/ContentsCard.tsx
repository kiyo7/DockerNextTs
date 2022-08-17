//lib
import Link from 'next/link'

interface Props {
  contentsName: string
  Icon: JSX.Element
  path?: string
}

export const ContentsCard: React.FC<Props> = ({ contentsName, Icon, path = '' }) => {
  return (
    <>
      <div className="card m-3 mt-8 bg-base-100 shadow-xl hover:cursor-pointer hover:opacity-75 ">
        <div className="card-body items-center text-center">
          <Link href={path}>
            <a className="contents">{Icon}</a>
          </Link>
          <h2 className="card-title text-xs md:text-sm">{contentsName}</h2>
        </div>
      </div>
    </>
  )
}
