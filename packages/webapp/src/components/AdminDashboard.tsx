import { useState, useEffect } from 'react'
import ProductController from '../api/ProductController';

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
    <section>
      <h1>A la carte</h1>
      <ul>
        {products.map(product => (
          <li>
            <div>
              <h3>{product.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}