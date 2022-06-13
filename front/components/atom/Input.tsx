//lib
import { Dispatch, SetStateAction } from 'react'
import { Input } from '@supabase/ui'

interface Props {
  type: string
  value: string
  onChange: Dispatch<SetStateAction<string>>
  label: string
  placeholder: string
  icon: JSX.Element
}

export const SInput: React.FC<Props> = ({ type, value, onChange, label, placeholder, icon }) => {
  return (
    <>
      <label className="text-gray-500">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        icon={icon}
        className="my-2 w-full rounded border py-2 px-3"
      />
    </>
  )
}
