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
        id: action.product.id,
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
    case actionTypes.EDIT_PRODUCT: {
      const newProduct: IProduct = {
        id: action.product.id,
        name: action.product.name,
        price: action.product.price,
        stock: action.product.stock,
        pokeData: action.product.pokeData
      };
      const temp = [...state.products];
      const index = temp.findIndex((el) => (el.id = newProduct.id));
      temp[index] = newProduct;
      return {
        ...state,
        products: temp
      };
    }
    case actionTypes.REMOVE_PRODUCT: {
      const temp = [...state.products];
      const objWithIdIndex = temp.findIndex(
        (obj: any) => obj.id === action.product.id
      );
      temp.splice(objWithIdIndex, 1);
      console.log('temp', temp);
      return {
        ...state,
        products: temp
      };
    }
  }
  return state;
};

export default reducer;
