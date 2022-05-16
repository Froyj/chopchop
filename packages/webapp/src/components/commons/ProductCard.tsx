import { Product } from '../../types/Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

type Props = {
  product: Product;
  openForm: (Product) => void;
}

export default function ProductCard({ product, openForm }: Props) {
  const productLabel = product.name.length < 50 ? product.name : `${product.name.slice(0, 49)}...`

  return (
    <li key={product._id} className=' min-w-[200px] basis-full md:basis-[250px] mt-16'>
      <div className=' p-4 text-center flex flex-col h-full'>
        <div className='h-0'>
          <img src={product.imageUrl} alt="" className='relative -top-[75px] rounded-full w-36 h-36 object-cover mx-auto border-2' />
        </div>
        <div className='flex-grow border-2 border-slate-400 rounded-3xl flex flex-col space-y-6 pt-24 pb-8 px-2 justify-between'>
          <h3 className='text-xl font-normal max-h-24 overflow-hidden'>{productLabel}</h3>
          <div className='flex flex-col min-h-fit'>
            <span className='font-semibold text-xl'>{product.availability}</span>
            <button onClick={() => openForm(product)}><FontAwesomeIcon icon={faEdit} /></button>
          </div>
        </div>
      </div>

    </li>
  )
}