interface Props {
  icon?: JSX.Element
  buttonText: string
  clickEvent?: () => void
  buttonColor?: 'primary' | 'secondary' | 'accent' | 'ghost'
  textColor?: string
  disabled?: boolean
}

export const PrimaryButton: React.FC<Props> = ({
  icon,
  buttonText,
  clickEvent,
  buttonColor = 'accent',
  textColor = 'white',
  disabled,
}) => {
  const buttonStyle = () => {
    switch (buttonColor) {
      case 'primary':
        return 'btn-primary'
      case 'secondary':
        return 'btn-secondary'
      case 'accent':
        return 'btn-accent'
      case 'ghost':
        return 'btn-ghost'
      default:
        ''
    }
  }
  return (
    <div>
      <button
        onClick={clickEvent}
        className={`${buttonStyle()} btn my-10 rounded-full text-${textColor}`}
        disabled={disabled}
      >
        {icon}
        <span className={`mx-2 ${disabled ? 'text-white' : `text-${textColor}`} `}>
          {buttonText}
        </span>
      </button>
    </div>
  )
}
