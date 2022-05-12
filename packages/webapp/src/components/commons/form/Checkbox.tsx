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
    <label className='flex'>
      <span className=''>{label}</span>
      <input
        {...register(name)}
        type="checkbox"
        value={value}
        className="self-center"
      />
    </label>
  )
}

export default Checkbox