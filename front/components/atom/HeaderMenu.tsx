interface Props {
  onClick?: () => void //?は仮
  contentsName: string
}

export const HeaderMenu: React.FC<Props> = ({ onClick, contentsName }) => {
  return (
    <>
      <a
        onClick={onClick}
        className="mt-4 mr-4 block cursor-pointer text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
      >
        {contentsName}
      </a>
    </>
  )
}
