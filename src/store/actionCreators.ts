import * as actionTypes from './actionTypes';

export function addProduct(product: IProduct) {
  const action: ProductsAction = {
    type: actionTypes.ADD_PRODUCT,
    product
  };

  return simulateHttpRequest(action);
}

export function editProduct(product: IProduct) {
  const action: ProductsAction = {
    type: actionTypes.EDIT_PRODUCT,
    product
  };

  return simulateHttpRequest(action);
}

export function removeProduct(product: IProduct) {
  const action: ProductsAction = {
    type: actionTypes.REMOVE_PRODUCT,
    product
  };
  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ProductsAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 750);
  };
}
