interface ReheatInstructions {
  reheatMode: string;
  reheatInstructions: string;
}

export type Product = {
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

export type ProductDto = Omit<Product, '_id'>;
