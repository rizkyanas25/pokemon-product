import * as actionTypes from './actionTypes';

export function addArticle(product: IProduct) {
  const action: ProductsAction = {
    type: actionTypes.ADD_PRODUCT,
    product
  };

  return simulateHttpRequest(action);
}

export function removeArticle(product: IProduct) {
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
