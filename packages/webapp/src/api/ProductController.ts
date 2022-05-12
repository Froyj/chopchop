import axios from '../helpers/axios-config';

interface ReheatInstructions {
  mode: string;
  instructions: string;
}
interface ProductDto {
  _id: string;
  name: string;
  description: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: ReheatInstructions;
  availability: string;
  servings: number;
  imageUrl: string;
};
class ProductController {
  public static getAll() {
    return axios.get('/products').then((res) => res.data);
  }
  public static create(productDto: ProductDto) {
    return axios.post('/products', productDto).then(res => res.data);
  }
}

export { ProductController as default };
