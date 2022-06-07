import { useFormContext } from 'react-hook-form';

type Props = {
  placeholder?: string;
  name: string;
};

function TextInput({ name, placeholder }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <input
        {...register(name)}
        placeholder={placeholder}
        type="text"
        className="rounded-lg border p-2"
      />
      <p className="ml-2 text-sm text-red-600">{errors[name]?.message}</p>
    </>
  );
}

export default TextInput;
