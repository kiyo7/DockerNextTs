interface Props {
  clickEvent: () => void
  contentsName: string
  Icon: React.ReactNode
}

export const HeaderMenu: React.FC<Props> = ({ clickEvent, contentsName, Icon }) => {
  return (
    <>
      <li className="my-1">
        <p onClick={clickEvent}>
          {Icon} {contentsName}
        </p>
      </li>
    </>
  )
}
