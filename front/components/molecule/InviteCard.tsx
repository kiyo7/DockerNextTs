//lib
import { IconMail, IconPlusCircle } from '@supabase/ui'
import { Button } from '@mantine/core'
import { Input } from '@mantine/core'
import { useInputState } from '@mantine/hooks'

//components
import { useMutateAuth } from '../../hooks/mutate/useMutateAuth'

export const InviteCard: React.FC = () => {
  const { inviteUser } = useMutateAuth()
  const [stringValue, setStringValue] = useInputState('')

  const handleInvite = () => {
    inviteUser.mutate(stringValue)
    setStringValue('')
  }

  return (
    <>
      <div className="my-12 flex w-full flex-col items-center">
        <Input
          className="w-9/12 lg:w-7/12"
          icon={<IconMail />}
          onChange={setStringValue}
          placeholder="メールアドレス"
          radius="lg"
          size="lg"
          value={stringValue}
          variant="filled"
        />
      </div>
      <div className="my-12">
        <Button
          className="bg-teal-400"
          disabled={!stringValue}
          leftIcon={<IconPlusCircle />}
          onClick={handleInvite}
          radius="lg"
          size="lg"
        >
          招待する
        </Button>
      </div>
    </>
  )
}
