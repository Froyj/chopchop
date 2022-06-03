import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
};

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function PickProductImage({ name }: Props) {
  const { register } = useFormContext();
  const { onChange, ref } = register(name);
  const [image, setImage] = useState<string>('');

  const onFileChange = useCallback(async (event) => {
    if (event.target.files?.[0]) {
      const base64 = await getBase64(event.target.files[0]);
      console.log(typeof base64);
      setImage(base64);
      onChange(event);
    }
  }, []);

  return (
    <>
      {image && <img src={image} />}
      <input type="file" name={name} ref={ref} onChange={onFileChange} />
    </>
  );
}

export default PickProductImage;
