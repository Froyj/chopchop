import axios from '../helpers/axios-config';

class ProductController {
  public static getProducts() {
    return axios.get('/products').then((res) => res.data);
  }
}

export { ProductController as default };
