interface Props {
  changeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: JSX.Element
}

export const ImgUploadButton: React.FC<Props> = ({ changeEvent, children }) => {
  return (
    <div className="flex justify-center">
      <label htmlFor="avatar">{children}</label>
      <input className="hidden" type="file" id="avatar" accept="image/*" onChange={changeEvent} />
    </div>
  )
}
