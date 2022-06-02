import React from 'react';

type Props = {
  url: string | undefined;
};

function ProductImage({ url = 'assets/placeholder.png' }: Props) {
  return (
    <img
      src={url}
      alt=""
      className="relative rounded-full w-48 h-48 object-cover mx-auto border-2"
    />
  );
}

export default ProductImage;
