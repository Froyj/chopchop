type Props = {
  url: string | undefined;
  width?: string;
};

function ProductImage({
  url = 'assets/placeholder.png',
  width = '150px',
}: Props) {
  return (
    <img
      src={url}
      alt=""
      className={`relative rounded-full w-[${width}] h-[${width}] object-cover mx-auto border-2`}
    />
  );
}

export default ProductImage;
