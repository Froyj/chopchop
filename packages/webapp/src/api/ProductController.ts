import {
  CreateProductDto,
  Product,
  UpdateProductDto,
  UpdateProductFormState,
} from '@customTypes/Product';
import axios from '@helpers/axios-config';

class ProductController {
  public static getAll() {
    return axios.get('/products').then((res) => res.data);
  }
  public static create(productDto: CreateProductDto) {
    return axios.post('/products', productDto).then((res) => res.data);
  }

  public static update(id: string, productDto: UpdateProductFormState) {
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
