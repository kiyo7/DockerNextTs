interface Props {
  onClick?: () => void
  contentsName: string
  Icon: JSX.Element
}

export const HeaderMenu: React.FC<Props> = ({ onClick, contentsName, Icon }) => {
  return (
    <>
      <a
        onClick={onClick}
        className="mt-4 mr-4 block cursor-pointer text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
      />
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          {Icon}
          <span className="ml-3 flex-1 whitespace-nowrap">{contentsName}</span>
        </a>
      </li>
    </>
  )
}
