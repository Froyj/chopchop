import { Product, ProductDto } from '@customTypes/Product';
import axios from '@helpers/axios-config';

class ProductController {
  public static getAll() {
    return axios.get('/products').then((res) => res.data);
  }
  public static create(product: ProductDto) {
    return axios.post('/products', product).then((res) => res.data);
  }

  public static update(id: string, product: Product) {
    return axios.patch(`/products/${id}`, product).then((res) => res.data);
  }

  public static delete(id) {
    return axios.delete(`/products/${id}`).then((res) => res.data);
  }
}

export { ProductController as default };
