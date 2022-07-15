export const Spinner: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="m-auto my-5 h-12 w-12 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
    </div>
  )
}
