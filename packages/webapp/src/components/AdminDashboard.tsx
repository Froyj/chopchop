import { useState, useEffect, useReducer } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import { productsReducer, initialState, ActionType } from '@reducers/products';
import { Product } from '@customTypes/Product';
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

  const handleDelete = async (product) => {
    async function deleteProduct(id) {
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

  const updateImage = async (id, product) => {
    const formData = new FormData();
    formData.append('file', product.productImage[0]);
    const imageUrl = await ProductController.updateImage(id, formData);
    return imageUrl;
  };

  const handleUpdate = async (id: string, product) => {
    try {
      await toast.promise(
        ProductController.update(id, product)
          .then(async () => {
            const productCopy = { ...product };
            if (product.productImage.length !== 0) {
              productCopy.imageUrl = await updateImage(id, product);
            }
            return productCopy;
          })
          .then(() => {
            closeModal();
            dispatchProducts({
              type: ActionType.UPDATE_PRODUCT,
              product: { _id: id, ...product },
            });
          }),
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

  const handleCreate = async (productDto) => {
    try {
      await toast.promise(
        ProductController.create(productDto)
          .then(async (newProduct) => {
            if (productDto.productImage.length !== 0) {
              newProduct.imageUrl = await updateImage(
                newProduct._id,
                newProduct
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
              handleDelete={() => handleDelete(selectedProduct)}
              handleCreate={handleCreate}
            />
          </Modal>
        }
      </ul>
    </section>
  );
}
