import { Product, ProductDto } from '@customTypes/Product';
import axios from '@helpers/axios-config';

class ProductController {
  public static getAll() {
    return axios.get('/products').then((res) => res.data);
  }
  public static create(product: ProductDto) {
    return axios.post('/products', product).then((res) => res.data);
  }

  public static update(product: Product) {
    return axios
      .patch(`/products/${product._id}`, product)
      .then((res) => res.data);
  }

  public static delete(product: Product) {
    return axios.delete(`/products/${product._id}`).then((res) => res.data);
  }
}

export { ProductController as default };
