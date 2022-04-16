import { ReheatInstructions } from '../entities/product.entity';

export class CreateProductDto {
  name: string;
  description: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: ReheatInstructions;
  availability: string;
  servings: number;
  imageUrl: string;
}
