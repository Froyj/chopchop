import { useFormContext } from "react-hook-form"

type Props = {
  name: string;
  min?: number;
  max?: number;
}

function NumberInput({ name, min, max }: Props) {
  const { register, formState: { errors } } = useFormContext()

  return (
    <>
      <input
        {...register(name)}
        min={min}
        max={max}
        type="number"
        className='border w-12 mr-4 rounded-md inner text-center' />
      <p className="ml-2 text-sm text-red-600">{errors[name]?.message}</p>
    </>
  )
}

export default NumberInput;