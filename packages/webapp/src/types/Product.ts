interface ReheatInstructions {
  mode: string;
  instructions: string;
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  nutritionalInformation: string[];
  retentionTime: number;
  reheatingInstructions: ReheatInstructions;
  availability: boolean;
  servings: number;
  imageUrl: string;
};




