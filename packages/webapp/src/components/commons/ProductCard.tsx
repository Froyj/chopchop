import { Product } from '../../types/Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import Modal from './Modal';
import ProductForm from './ProductForm';

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <li key={product._id} className=' min-w-[300px] basis-full md:basis-[300px]'>
      <div className=' p-4 text-center -mt-[90px]'>
        <div className=''>
          <img src={product.imageUrl} alt="" className='relative top-[90px] rounded-full w-48 h-48 object-cover mx-auto border-2' />
        </div>
        <div className='border-2 border-slate-400 rounded-3xl flex flex-col text-2xl space-y-6 pt-32 pb-8 px-2'>
          <h3 className='font-normal'>{product.name}</h3>
          <span className='font-semibold'>{product.availability}</span>
          <button onClick={() => setIsModalOpen(true)}><FontAwesomeIcon icon={faEdit} /></button>
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen}>
        <ProductForm />
      </Modal>}
    </li>
  )
}