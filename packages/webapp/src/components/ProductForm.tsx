import { useForm, FormProvider, useWatch } from 'react-hook-form';
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
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

type Props = {
  product: Product | null;
  handleUpdate: (id: string, product) => void;
  handleDelete: (id: string) => void;
  handleCreate: (product) => void;
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
    defaultValues: productDto as UpdateProductDto,
    resolver: yupResolver(createProductSchema),
  });

  const { handleSubmit, register } = formMethods;

  const onSubmit = (data) => {
    if (product?._id) {
      handleUpdate(product._id, data as UpdateProductDto);
    } else {
      handleCreate(data as CreateProductDto);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-auto bg-white w-1/2 align-middle border-2 rounded-lg p-3 gap-y-4"
      >
        <ProductImage
          url={
            product?.imageUrl
              ? `${API_URL}/${product?.imageUrl}`
              : 'assets/placeholder.png'
          }
        />
        <TextInput placeholder="Qu'est ce qu'on mange?" name="name" />
        <TextInput placeholder="Description" name="description" />
        <TextInput placeholder="Catégorie" name="category" />
        <CheckboxGroup>
          <Checkbox
            name="nutritionalInformation"
            value="vegetarian"
            label="Végétarien"
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
            label="Allèrgenes de fruits à coque"
          />
          <Checkbox
            name="nutritionalInformation"
            value="nuts_residue"
            label="Allèrgenes de lait"
          />
        </CheckboxGroup>
        <div className="flex justify-evenly gap-2 my-3">
          <div className="rounded-lg border p-4 flex flex-col flex-wrap gap-y-8 gap-x-8 text-center basis-1/2">
            <span>Se conserve jusqu'à</span>
            <span>
              <NumberInput name="retentionTime" min={0} />
              <strong>jour(s)</strong>
            </span>
            <span>après réception</span>
          </div>
          <div
            className="rounded-lg border p-4 flex flex-col flex-wrap gap-y-8 gap-x-8 text-center basis-1/2"
            {...register('reheatingInstructions.reheatMode')}
          >
            <select className="border rounded-md p-2 bg-white">
              <option value="Four traditionnel">Four traditionnel</option>
              <option value="Micro-ondes">Micro-ondes</option>
              <option value="Poêle">Poêle</option>
              <option value="Casserole">Casserole</option>
            </select>
            <textarea
              {...register('reheatingInstructions.reheatInstructions')}
              className="border p-2 rounded-md"
              placeholder="Temps et température/puissance"
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
        <PickProductImage name="productImage" />
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
