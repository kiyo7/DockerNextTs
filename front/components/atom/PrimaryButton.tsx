interface Props {
  icon?: JSX.Element
  buttonText: string
}

export const PrimaryButton: React.FC<Props> = ({ icon, buttonText }) => {
  return (
    <div>
      <button className="btn btn-accent my-10 rounded-full text-white">
        {icon}
        <span className="mx-2">{buttonText}</span>
      </button>
    </div>
  )
}
