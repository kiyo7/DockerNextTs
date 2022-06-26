interface Props {
  icon?: JSX.Element
  type?: 'button' | 'submit' | 'reset' | undefined
  buttonText: string
  clickEvent?: () => void
}

export const PrimaryButton: React.FC<Props> = ({ icon, type, buttonText, clickEvent }) => {
  return (
    <div>
      <button
        onClick={clickEvent}
        type={type}
        className="btn btn-accent my-10 rounded-full text-white"
      >
        {icon}
        <span className="mx-2">{buttonText}</span>
      </button>
    </div>
  )
}
