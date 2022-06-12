//lib
import { Input } from "@supabase/ui";

interface Props {
  type: string;
  label: string;
  placeholder: string;
  icon: JSX.Element;
}

export const SInput: React.FC<Props> = ({ type, label, placeholder, icon }) => {
  return (
    <Input
      type={type}
      label={label}
      placeholder={placeholder}
      icon={icon}
      className="w-full my-2 rounded border px-3 py-2 "
    />
  );
};
