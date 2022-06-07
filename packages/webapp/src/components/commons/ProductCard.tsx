import { Product } from '@customTypes/Product';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '@helpers/env';

type Props = {
  product: Product;
  openForm: (product: Product) => void;
};

export default function ProductCard({ product, openForm }: Props) {
  const productLabel =
    product.name?.length < 50
      ? product.name
      : `${product.name.slice(0, 49)}...`;

  return (
    <li
      key={product._id}
      className="mt-16 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
    >
      <div className=" p-4 text-center flex flex-col h-full whit">
        <div className="h-0">
          <img
            src={
              product.imageUrl
                ? `${API_URL}/${product.imageUrl}`
                : 'assets/placeholder.png'
            }
            alt=""
            className="relative -top-[75px] rounded-full w-36 h-36 object-cover mx-auto border-2"
          />
        </div>
        <div className="flex-grow border-2 border-slate-400 rounded-3xl flex flex-col space-y-6 pt-24 pb-8 px-2 justify-between">
          <h3 className="text-xl font-normal max-h-24 overflow-hidden">
            {productLabel}
          </h3>
          <div className="flex flex-col min-h-fit">
            <span className="font-semibold text-xl">
              {product.availability ? 'Disponible' : 'Indisponible'}
            </span>
            <button onClick={() => openForm(product)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
