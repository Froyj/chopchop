import { Product } from "types/Product";

type ProductState = Product[] | [] 

export const initialState: ProductState = [];

export function productsReducer(state: ProductState, action): ProductState {
  const {type, payload } = action;
  switch (type) {
    case 'ADD_NEW_PRODUCT':
      return [...state, payload];
    case 'DELETE_PRODUCT':
      return state.filter((p) => p._id !== payload._id);
    case 'UPDATE_PRODUCT':
      const indexToModify = state.findIndex(
        (p) => p._id === payload._id
      );
      const productsCopy = [...state];
      productsCopy[indexToModify] = payload;
      return productsCopy;
    case 'LOAD_PRODUCTS':
      return action.payload;
    default:
      return state;
  }
};
