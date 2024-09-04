import * as actionTypes from './actionTypes';

const initialState: ProductsState = {
  products: []
};

const reducer = (
  state: ProductsState = initialState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT: {
      const newProduct: IProduct = {
        id: Math.random() + '', // not really unique
        name: action.product.name,
        price: action.product.price,
        stock: action.product.stock,
        pokeData: action.product.pokeData
      };
      const temp = [...state.products];
      temp.push(newProduct);
      return {
        ...state,
        products: temp
      };
    }
    case actionTypes.REMOVE_PRODUCT: {
      const updatedProducts: IProduct[] = state.products.filter(
        (product) => product.id !== action.product.id
      );
      return {
        ...state,
        products: updatedProducts
      };
    }
  }
  return state;
};

export default reducer;
