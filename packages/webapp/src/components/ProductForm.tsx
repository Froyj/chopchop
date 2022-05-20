import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Product, ProductDto } from 'types/Product';

import TextInput from './commons/form/TextInput';
import CheckboxGroup from './commons/form/CheckboxGroup';
import Checkbox from './commons/form/Checkbox';
import { createProductSchema } from '../form_validations/product.schema';
import NumberInput from './commons/form/NumberInput';

type Props = {
  product: Product | null;
  handleUpdate: (product: Product) => void;
  handleDelete: () => void;
  handleCreate: (product: ProductDto) => void;
};

export default function ProductForm({
  product,
  handleUpdate,
  handleDelete,
  handleCreate,
}: Props) {
  const formMethods = useForm({
    defaultValues: { ...product },
    resolver: yupResolver(createProductSchema),
  });
  const { handleSubmit, register } = formMethods;
  const isUpdatingProductForm = Boolean(product);

  const onSubmit = (formData) =>
    isUpdatingProductForm ? handleUpdate(formData) : handleCreate(formData);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-auto bg-white w-1/2 align-middle border-2 rounded-lg p-3 gap-y-4"
      >
        <img
          src={product?.imageUrl}
          alt=""
          className="relative rounded-full w-48 h-48 object-cover mx-auto border-2"
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
        <TextInput name="imageUrl" />
        <input
          type="submit"
          value={isUpdatingProductForm ? 'Valider' : 'Ajouter le produit'}
          className="rounded-md border p-2 bg-neutral-300"
        />
        {isUpdatingProductForm && (
          <input
            type="button"
            value="Supprimer"
            className="rounded-md border p-2 bg-red-500"
            onClick={() => handleDelete()}
          />
        )}
      </form>
    </FormProvider>
  );
}
