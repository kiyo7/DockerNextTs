interface Props {
  contentsName: string
  Icon: any
}

export const SettingContents: React.FC<Props> = ({ contentsName, Icon }) => {
  return (
    <>
      <div className="w-s8/12 card m-3 mt-8 bg-base-100 shadow-xl hover:cursor-pointer hover:opacity-75 ">
        <div className="card-body items-center text-center">
          {Icon}
          <h2 className="card-title text-xs md:text-sm">{contentsName}</h2>
        </div>
      </div>
    </>
  )
}
