import { useFormContext } from "react-hook-form"

type Props = {
  placeholder: string;
  name: string;
}

function TextInput({ name, placeholder }: Props) {
  const { register } = useFormContext()

  return (
    <label>
      <input 
        {...register(name)} 
        placeholder={placeholder} 
        type="text" 
        className="rounded-lg border p-4 basis-full shrink-0" />
    </label>
  )
}

export default TextInput