import { Product } from 'customTypes/Product';

export enum ActionType {
  ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  LOAD_PRODUCTS = 'LOAD_PRODUCTS',
}

type State = Product[] | [];

type Action =
  | {
      type: ActionType.ADD_NEW_PRODUCT;
      product: Product;
    }
  | {
      type: ActionType.DELETE_PRODUCT;
      id: string;
    }
  | {
      type: ActionType.LOAD_PRODUCTS;
      products: Product[];
    }
  | {
      type: ActionType.UPDATE_PRODUCT;
      product: Product;
    };

export const initialState: State = [];

export function productsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_NEW_PRODUCT':
      return [...state, action.product];
    case 'DELETE_PRODUCT':
      return state.filter((p) => p._id !== action.id);
    case 'UPDATE_PRODUCT':
      const indexToModify = state.findIndex(
        (p) => p._id === action.product._id
      );
      const productsCopy = [...state];
      productsCopy[indexToModify] = action.product;
      return productsCopy;
    case 'LOAD_PRODUCTS':
      return action.products;
    default:
      return state;
  }
}
