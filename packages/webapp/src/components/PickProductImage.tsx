import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  id?: string;
  name: string;
  onFileChange: (e: any) => void;
};

function PickProductImage({ name, id, onFileChange }: Props) {
  const { register } = useFormContext();
  const { onChange, ref } = register(name);

  return (
    <>
      <input
        type="file"
        name={name}
        ref={ref}
        onChange={onFileChange}
        id={id}
        className="hidden"
      />
    </>
  );
}

export default PickProductImage;
