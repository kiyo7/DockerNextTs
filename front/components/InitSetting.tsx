//lib
import { Button, IconSmile } from '@supabase/ui'
import { SInput } from './atom/Input'

//components
import Image from 'next/image'

//images
import employee from '../images/employee.png'
import manager from '../images/manager.png'

export const Profile: React.FC = () => {
  return (
    <div className="mx-3">
      <div className="my-10 text-center font-sans text-4xl tracking-widest text-gray-500">
        ようこそ
      </div>
      <SInput
        type="text"
        value={''}
        onChange={() => {}}
        label="あなたの名前"
        placeholder="田中 太郎"
        icon={<IconSmile />}
      />
      <div className="mt-12 flex">
        <div className="flex flex-col border-2 text-center">
          <Image
            src={manager}
            onClick={() => alert('管理者！')}
            width={250}
            height={250}
            className="hover:animate-bound hover:cursor-pointer"
          />
          <span className="my-5 font-sans tracking-widest ">管理者</span>
        </div>
        <span className="mx-5" />
        <div className="flex flex-col border-2 text-center">
          <Image
            src={employee}
            onClick={() => alert('従業員！')}
            width={250}
            height={250}
            className="hover:animate-bound hover:cursor-pointer"
          />
          <span className="my-5 font-sans tracking-widest">従業員</span>
        </div>
      </div>
      <div className="m-auto my-10 w-7/12">
        <Button block className="rounded-full">
          登録
        </Button>
      </div>
    </div>
  )
}
