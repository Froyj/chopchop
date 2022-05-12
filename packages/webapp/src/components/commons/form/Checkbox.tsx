import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  name: string;
  label: string;
  value: string;
}

function Checkbox({ name, label, value }: Props) {
  const { register } = useFormContext()

  return (
    <label className='flex basis-1/2'>
      <input
        {...register(name)}
        type="checkbox"
        value={value}
        className="self-center"
      />
      <span className='ml-4'>{label}</span>
    </label>
  )
}

export default Checkbox