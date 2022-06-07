import { Url } from 'url';

type Props = {
  url: string | undefined;
  width?: string;
  selectedImage?: string;
};

function FormProductImage({
  url = 'assets/placeholder.png',
  width = '150px',
  selectedImage,
}: Props) {
  return (
    <img
      src={selectedImage || url}
      alt=""
      className={`relative rounded-full w-[${width}] h-[${width}] object-cover mx-auto border-2`}
    />
  );
}

export default FormProductImage;
