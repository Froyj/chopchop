import { useForm, FormProvider } from 'react-hook-form';
import {
  Product,
  UpdateProductFormState,
  CreateProductFormState,
} from '@customTypes/Product';

import TextInput from '@components/commons/form/TextInput';
import NumberInput from '@components/commons/form/NumberInput';
import CheckboxGroup from '@components/commons/form/CheckboxGroup';
import Checkbox from '@components/commons/form/Checkbox';

import { yupResolver } from '@hookform/resolvers/yup';
import { createProductSchema } from '../form_validations/product.schema';
import PickProductImage from './PickProductImage';
import ProductImage from './commons/ProductImage';
import { API_URL } from '@helpers/env';
import FormProductImage from './commons/FormProductImage';
import { useCallback, useState } from 'react';

type Props = {
  product: Product | null;
  handleUpdate: (id: string, product: UpdateProductFormState) => void;
  handleDelete: (id: string) => void;
  handleCreate: (product: CreateProductFormState) => void;
};

export default function ProductForm({
  product,
  handleUpdate,
  handleDelete,
  handleCreate,
}: Props) {
  const productDto = { ...product };
  delete productDto._id;
  delete productDto.imageUrl;

  const formMethods = useForm({
    defaultValues: productDto as UpdateProductFormState,
    resolver: yupResolver(createProductSchema),
  });

  const { handleSubmit, register } = formMethods;

  const [image, setImage] = useState<string>('');
  const { onChange } = register('productImage');

  function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  const onFileChange = useCallback(async (event) => {
    if (event.target.files?.[0]) {
      const base64 = await getBase64(event.target.files[0]);
      console.log(typeof base64);
      setImage(base64);
      onChange(event);
    }
  }, []);

  const onSubmit = (data: CreateProductFormState | UpdateProductFormState) => {
    if (product) {
      handleUpdate(product._id, data as UpdateProductFormState);
    } else {
      handleCreate(data as CreateProductFormState);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-auto bg-white w-1/2 align-middle border-2 rounded-lg p-3 gap-y-2"
      >
        <label htmlFor="upload-file-input">
          <FormProductImage
            selectedImage={image}
            url={
              product?.imageUrl
                ? `${API_URL}/${product?.imageUrl}`
                : 'assets/placeholder.png'
            }
          />
        </label>
        <TextInput placeholder="Qu'est ce qu'on mange?" name="name" />
        <TextInput placeholder="Description" name="description" />
        <TextInput placeholder="Cat??gorie" name="category" />
        <CheckboxGroup>
          <Checkbox
            name="nutritionalInformation"
            value="vegetarian"
            label="V??g??tarien"
          />
          <Checkbox name="nutritionalInformation" value="vegan" label="Vegan" />
          <Checkbox
            name="nutritionalInformation"
            value="gluten_free"
            label="Sans lactose"
          />
          <Checkbox
            name="nutritionalInformation"
            value="lactose_free"
            label="Sans gluten"
          />
          <Checkbox
            name="nutritionalInformation"
            value="contains_milk_allergen"
            label="All??rgenes de fruits ?? coque"
          />
          <Checkbox
            name="nutritionalInformation"
            value="nuts_residue"
            label="All??rgenes de lait"
          />
        </CheckboxGroup>
        <div className="flex justify-evenly gap-2 my-3">
          <div className="rounded-lg border p-4 flex flex-col flex-wrap gap-y-8 gap-x-8 text-center basis-1/2">
            <span>Se conserve jusqu'??</span>
            <span>
              <NumberInput name="retentionTime" min={0} />
              <strong>jour(s)</strong>
            </span>
            <span>apr??s r??ception</span>
          </div>
          <div
            className="rounded-lg border p-4 flex flex-col flex-wrap gap-y-8 gap-x-8 text-center basis-1/2"
            {...register('reheatingInstructions.reheatMode')}
          >
            <select className="border rounded-md p-2 bg-white">
              <option value="Four traditionnel">Four traditionnel</option>
              <option value="Micro-ondes">Micro-ondes</option>
              <option value="Po??le">Po??le</option>
              <option value="Casserole">Casserole</option>
            </select>
            <textarea
              {...register('reheatingInstructions.reheatInstructions')}
              className="border p-2 rounded-md"
              placeholder="Temps et temp??rature/puissance"
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="rounded-lg border p-4 flex flex-wrap gap-y-8 gap-x-8 text-center basis-1/2 justify-around">
          <span>
            <NumberInput name="servings" min={0} />
            <strong>portions</strong>
          </span>
          <Checkbox name="availability" value="1" label="Disponible" />
        </div>
        <PickProductImage
          id="upload-file-input"
          name="productImage"
          onFileChange={onFileChange}
        />
        <input
          type="submit"
          value={product ? 'Valider' : 'Ajouter le produit'}
          className="rounded-md border p-2 bg-neutral-300"
        />
        {product && (
          <input
            type="button"
            value="Supprimer"
            className="rounded-md border p-2 bg-red-500"
            onClick={() => handleDelete(product._id)}
          />
        )}
      </form>
    </FormProvider>
  );
}
