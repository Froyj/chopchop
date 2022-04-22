import { useState, useEffect } from 'react'
import ProductController from '../api/ProductController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
export interface ReheatInstructions {
  reheatMode: string;
  reheatTime: number;
}

interface IProduct {
  _id: string;
  name: string;
  description: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: ReheatInstructions;
  availability: string;
  servings: number;
  imageUrl: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<IProduct[]>([])

  const fetchProducts = async () => {
    const productDTO = await ProductController.getProducts();
    setProducts(productDTO);
  }

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <section className='p-12'>
      <h1 >A la carte</h1>
      <ul className='flex flex-row flex-wrap -mx-8'>
        {products.map(product => (
          <li key={product._id} className='basis-1/3 px-8 '>
            <div className=' p-4 text-center -mt-[75px]'>
              <img src={product.imageUrl} alt="" className='relative top-[75px] rounded-full w-32 h-32 object-cover mx-auto border-2' />
              <div className='border rounded-3xl flex flex-col text-2xl space-y-6 pt-24 pb-8'>
                <h3 className='font-normal'>{product.name}</h3>
                <span className='font-semibold'>{product.availability}</span>
                <button><FontAwesomeIcon icon={faEdit} /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}