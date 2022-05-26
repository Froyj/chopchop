import { useState, useEffect, useReducer } from 'react';
import ProductController from '@api/ProductController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Product, ProductDto } from '@customTypes/Product';
import ProductCard from '@components/commons/ProductCard';
import ProductForm from '@components/ProductForm';
import Modal from '@components/commons/Modal';
import useModal from '../hooks/useModal';
import { productsReducer, initialState } from '@reducers/products';
import {
  UPDATE_PRODUCT,
  LOAD_PRODUCTS,
  DELETE_PRODUCT,
  ADD_NEW_PRODUCT,
} from '../actions/products';
import ConfirmationPopup from './ConfirmationPopup';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AdminDashboard() {
  const [products, dispatchProducts] = useReducer(
    productsReducer,
    initialState
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const fetchProducts = async () => {
    try {
      const productsDTO = await ProductController.getAll();
      dispatchProducts({ type: LOAD_PRODUCTS, payload: productsDTO });
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteProduct(id) {
    await ProductController.delete(id);
    dispatchProducts({ type: DELETE_PRODUCT, payload: id });
  }

  const handleDelete = async (product) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationPopup
            title="Suppression de produit"
            message="Tu es sure de vouloir supprimer ce produit ?"
            handleValidate={() =>
              toast.promise(deleteProduct(product._id), {
                pending: 'Suppression en cours',
                success: 'Produit supprimé',
                error: 'Erreur pendant la suppression du produit',
              })
            }
            onClose={() => {
              onClose();
              closeModal();
            }}
            validateLabel="Allez ! Poubelle !"
            denyLabel="Nonononon !"
          />
        );
      },
    });
  };

  const handleUpdate = async (id: string, productDto) => {
    try {
      await toast.promise(ProductController.update(id, productDto), {
        pending: 'Modification en cours',
        success: 'Produit modifié',
        error: 'Erreur pendant la modification du produit',
      });
      dispatchProducts({
        type: UPDATE_PRODUCT,
        payload: { _id: id, ...productDto },
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (productDto: ProductDto) => {
    try {
      await toast.promise(
        ProductController.create(productDto).then((newProduct) => {
          closeModal();
          dispatchProducts({ type: ADD_NEW_PRODUCT, payload: newProduct });
        }),
        {
          pending: 'Création en cours',
          success: 'Produit créé avec succès ! Bravo Championne !',
          error: 'Problème lors de la création du produit',
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openForm = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
    openModal();
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className="basis-[100%-250px] p-12">
      <div className="flex justify-between mb-12">
        <h1 className="text-4xl font-semibold">À la carte</h1>
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="w-auto h-12"
          onClick={() => openForm()}
        />
      </div>
      <ul className="mx-auto flex flex-wrap">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            openForm={openForm}
          />
        ))}
        {
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            onClose={() => setSelectedProduct(null)}
          >
            <ProductForm
              product={selectedProduct}
              handleUpdate={handleUpdate}
              handleDelete={() => handleDelete(selectedProduct)}
              handleCreate={handleCreate}
            />
          </Modal>
        }
      </ul>
    </section>
  );
}
