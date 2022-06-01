import { CreateProductDto, UpdateProductDto } from '@customTypes/Product';
import axios from '@helpers/axios-config';

class ProductController {
  public static getAll() {
    return axios.get('/products').then((res) => res.data);
  }
  public static create(product: CreateProductDto) {
    return axios.post('/products', product).then((res) => res.data);
  }

  public static update(id: string, product: UpdateProductDto) {
    const productDto = this.getFormDataFromFormObject(product);
    return axios.patch(`/products/${id}`, productDto).then((res) => res.data);
  }

  public static delete(id) {
    return axios.delete(`/products/${id}`).then((res) => res.data);
  }

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
}

export { ProductController as default };
