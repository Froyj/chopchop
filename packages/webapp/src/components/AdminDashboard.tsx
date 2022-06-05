import { useState, useEffect, useReducer } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import { productsReducer, initialState, ActionType } from '@reducers/products';
import {
  CreateProductFormState,
  Product,
  UpdateProductDto,
  UpdateProductFormState,
} from '@customTypes/Product';
import ProductController from '@api/ProductController';
import useModal from '../hooks/useModal';

import Modal from '@components/commons/Modal';
import ProductCard from '@components/commons/ProductCard';
import ProductForm from '@components/ProductForm';
import ConfirmationPopup from '@components/ConfirmationPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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
      dispatchProducts({
        type: ActionType.LOAD_PRODUCTS,
        products: productsDTO,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    async function deleteProduct(id: string) {
      await ProductController.delete(id);
      dispatchProducts({ type: ActionType.DELETE_PRODUCT, id });
    }

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationPopup
            title="Suppression de produit"
            message="Tu es sure de vouloir supprimer ce produit ?"
            handleValidate={() =>
              toast.promise(deleteProduct(id), {
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

  const updateImage = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const imageUrl = await ProductController.updateImage(id, formData);
    return imageUrl;
  };

  const handleUpdate = async (
    id: string,
    productFormState: UpdateProductFormState
  ) => {
    try {
      await toast.promise(
        async () => {
          const updatedProduct = await ProductController.update(
            id,
            productFormState
          );
          if (productFormState.productImage?.[0]) {
            const imageUrl = await updateImage(
              id,
              productFormState.productImage?.[0]
            );
            updatedProduct.imageUrl = imageUrl;
          }
          dispatchProducts({
            type: ActionType.UPDATE_PRODUCT,
            id,
            product: { ...updatedProduct },
          });
          closeModal();
        },
        {
          pending: 'Modification en cours',
          success: 'Produit modifié',
          error: 'Erreur pendant la modification du produit',
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (productFormState: CreateProductFormState) => {
    try {
      await toast.promise(
        ProductController.create(productFormState)
          .then(async (newProduct) => {
            if (productFormState.productImage?.[0]) {
              newProduct.imageUrl = await updateImage(
                newProduct._id,
                productFormState.productImage?.[0]
              );
            }
            return newProduct;
          })
          .then((newProduct) => {
            dispatchProducts({
              type: ActionType.ADD_NEW_PRODUCT,
              product: newProduct,
            });
            closeModal();
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
              handleDelete={handleDelete}
              handleCreate={handleCreate}
            />
          </Modal>
        }
      </ul>
    </section>
  );
}
