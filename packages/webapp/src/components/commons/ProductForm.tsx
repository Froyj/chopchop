import { useForm, FormProvider } from "react-hook-form";
import { Product } from 'types/Product';
import TextInput from './form/TextInput';
import CheckboxGroup from './form/CheckboxGroup';
import Checkbox from './form/Checkbox';
import ProductController from '../../api/ProductController';

type Props = {
  product: Product;
}

export default function ProductForm({ product }: Props) {

  const formMethods = useForm({ defaultValues: { ...product } });
  const { handleSubmit, register } = formMethods;

  const onSubmit = async (data) => {
    try {
      await ProductController.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-auto bg-white w-1/2 align-middle border-2 rounded-lg p-3 gap-y-4'>
        <img src={product.imageUrl} alt="" className='relative rounded-full w-48 h-48 object-cover mx-auto border-2' />
          <TextInput placeholder="Qu'est ce qu'on mange?" name='name' />
          <TextInput placeholder='Description' name='description' />
          <TextInput placeholder='Categorie' name='category' />
          <TextInput placeholder='Disponibilité' name='availability' />
          <CheckboxGroup>
            <Checkbox name='nutritionalInformation' value='vegetarian' label='Végétarien' />
            <Checkbox name='nutritionalInformation' value='vegan' label='Vegan' />
            <Checkbox name='nutritionalInformation' value='gluten_free' label='Sans lactose' />
            <Checkbox name='nutritionalInformation' value='lactose_free' label='Sans gluten' />
            <Checkbox name='nutritionalInformation' value='contains_milk_allergen' label='Allèrgenes de fruits à coque' />
            <Checkbox name='nutritionalInformation' value='nuts_residue' label='Allèrgenes de lait' />
          </CheckboxGroup>
          <div className='flex justify-evenly gap-2 my-3'>
            <div className="rounded-lg border p-4 flex flex-col flex-wrap gap-y-8 gap-x-8 text-center basis-1/2">
              <span>Se conserve jusqu'à</span>
              <span>
                <input {...register('retentionTime')} type="number" min={0} className='border w-12 mr-4 rounded-md inner' />
                <strong>
                  jour(s)
                </strong>
              </span>
              <span>après réception</span>
            </div>
            <div className="rounded-lg border p-4 flex flex-col flex-wrap gap-y-8 gap-x-8 text-center basis-1/2" {...register('reheatingInstructions.mode')}>
              <select className='border rounded-md p-2 bg-white' >
                <option value="Four traditionnel">Four traditionnel</option>
                <option value="Micro-ondes">Micro-ondes</option>
                <option value="Poêle">Poêle</option>
                <option value="Casserole">Casserole</option>
              </select>
              <textarea {...register('reheatingInstructions.instructions')} className='border p-2 rounded-md' placeholder='Temps et température/puissance' rows={4}></textarea>
            </div>
          </div>
          <div className="rounded-lg border p-4 flex flex-wrap gap-y-8 gap-x-8 text-center basis-1/2 justify-around">
            <span>
              <input type="number" min={0} className='border w-12 mr-4 rounded-md inner' {...register('servings')} />
              <strong>
                portions
              </strong>
            </span>
            <Checkbox name='availability' value='available' label='Disponible' />
          </div>
          <input type="submit" value="Valider" className="rounded-md border bg-neutral-300"/>
        </form>
      </FormProvider>
  )
}

