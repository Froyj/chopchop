import { useState, useEffect, useReducer } from 'react'
import ProductController from '../api/ProductController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Product, ProductDto } from 'types/Product';
import ProductCard from './commons/ProductCard';
import ProductForm from './ProductForm';
import Modal from './commons/Modal';
import useModal from '../hooks/useModal';
import { productsReducer, initialState } from '../reducers/products';
import { UPDATE_PRODUCT, LOAD_PRODUCTS, DELETE_PRODUCT } from '../actions/products';
import ConfirmationPopup from './ConfirmationPopup';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AdminDashboard() {
  const [products, dispatchProducts] = useReducer(productsReducer, initialState);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { isOpen, openModal, closeModal } = useModal();

  const fetchProducts = async () => {
    try {
      const productsDTO = await ProductController.getAll();
      dispatchProducts({ type: LOAD_PRODUCTS, payload: productsDTO });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(product) {
    await ProductController.delete(product);
    dispatchProducts({ type: DELETE_PRODUCT, payload: product })
  }

  const handleDelete = async (product) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationPopup
            title='Suppression de produit'
            message='Tu es sure de vouloir supprimer ce produit ?'
            handleValidate={() => deleteProduct(product)}
            onClose={onClose}
            validateLabel='Virez moi ça !'
            denyLabel='Nonononon !'
          />
        );
      }
    })
  }

  const handleUpdate = async (product: Product) => {
    try {
      await ProductController.update(product);
      dispatchProducts({ type: UPDATE_PRODUCT, payload: product });
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreate = async (data: ProductDto) => {
    try {
      const newProduct = await ProductController.create(data);
      dispatchProducts({ type: UPDATE_PRODUCT, payload: newProduct });
    } catch (error) {
      console.error(error)
    }
  }

  const openForm = (product?: Product) => {
    if(product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null)
    }
    openModal();
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
        <FontAwesomeIcon icon={faCirclePlus} className='w-auto h-12' onClick={() => openForm()}/>
      </div>
      <ul className='flex flex-row flex-wrap justify-around'>
        {products.map(product => (
          <ProductCard key={product._id} product={product} openForm={openForm} />
        ))}
        {<Modal isOpen={isOpen} closeModal={closeModal} onClose={() => setSelectedProduct(null)}>
          <ProductForm product={selectedProduct} handleUpdate={handleUpdate} handleDelete={() => handleDelete(selectedProduct)} handleCreate={handleCreate} />
        </Modal>}
      </ul>
    </section>
  )
}