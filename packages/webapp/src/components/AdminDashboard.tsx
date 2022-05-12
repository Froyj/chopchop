import { useState, useEffect } from 'react'
import ProductController from '../api/ProductController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'types/Product';
import ProductCard from './commons/ProductCard';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    const productDTO = await ProductController.getAll();
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
    <section className='p-12 max-w-4/5'>
      <div className='flex justify-between mb-12'>
        <h1 className='text-4xl font-semibold'>À la carte</h1>
        <FontAwesomeIcon icon={faCirclePlus} className='w-auto h-12' />
      </div>
      <ul className='flex flex-row flex-wrap -mx-8 align-bottom justify-around'>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </section>
  )
}