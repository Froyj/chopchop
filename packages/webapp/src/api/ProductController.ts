import { CreateProductDto, UpdateProductDto } from '@customTypes/Product';
import axios from '@helpers/axios-config';

interface ProductFormState {
  name: string;
  description: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: {
    reheatMode: string;
    reheatInstructions: string;
  };
  availability: string;
  servings: number;
  productImage: FileList;
}

class ProductController {
  static getFormDataFromFormObject(formState) {
    const formData = new FormData();
    for (let [key, value] of Object.entries(formState)) {
      if (typeof value !== 'string' && !(value instanceof Blob)) {
        value = JSON.stringify(value);
      }
      formData.append(key, value as string | Blob);
    }
    return formData;
  }

  public static getAll() {
    return axios.get('/products').then((res) => res.data);
  }
  public static create(product: ProductFormState) {
    return axios.post('/products', product).then((res) => res.data);
  }

  public static update(id: string, productDto: UpdateProductDto) {
    return axios.patch(`/products/${id}`, productDto).then((res) => res.data);
  }

  public static delete(id: string) {
    return axios.delete(`/products/${id}`).then((res) => res.data);
  }

  public static updateImage(id: string, formData: FormData) {
    return axios
      .patch(`/products/${id}/upload-image`, formData)
      .then((res) => res.data);
  }
}

export { ProductController as default };
