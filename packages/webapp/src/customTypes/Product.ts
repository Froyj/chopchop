export type Product = {
  _id: string;
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
  imageUrl?: string;
};

export type CreateProductDto = {
  name: string;
  description: string;
  category: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: {
    reheatMode: string;
    reheatInstructions: string;
  };
  availability: string;
  servings: number;
  productImage?: FileList;
};

export type UpdateProductDto = Partial<CreateProductDto>;

export interface CreateProductFormState {
  name: string;
  description: string;
  category: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: {
    reheatMode: string;
    reheatInstructions: string;
  };
  availability: string;
  servings: number;
  productImage?: FileList;
}

export type UpdateProductFormState = Partial<CreateProductFormState>;
