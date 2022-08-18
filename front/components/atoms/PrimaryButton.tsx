interface Props {
  buttonColor?: 'primary' | 'error' | 'accent' | 'ghost'
  buttonText: string
  clickEvent?: () => void
  disabled?: boolean
  icon?: JSX.Element
  textColor?: string
}

export const PrimaryButton: React.FC<Props> = ({
  buttonColor = '',
  buttonText,
  clickEvent,
  disabled,
  icon,
  textColor = 'white',
}) => {
  const buttonStyle = () => {
    switch (buttonColor) {
      case 'primary':
        return 'btn-primary'
      case 'error':
        return 'btn-error'
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
        className={`${buttonStyle()} btn my-10 w-full rounded-full text-${textColor}`}
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
