interface Props {
  icon?: JSX.Element
  buttonText: string
  clickEvent?: () => void
}

export const PrimaryButton: React.FC<Props> = ({ icon, buttonText, clickEvent }) => {
  return (
    <div>
      <button onClick={clickEvent} className="btn btn-accent my-10 rounded-full text-white">
        {icon}
        <span className="mx-2">{buttonText}</span>
      </button>
    </div>
  )
}
