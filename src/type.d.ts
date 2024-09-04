/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  pokeData: any;
}

type ProductsState = {
  products: IProduct[];
};

type ProductsAction = {
  type: string;
  product: IProduct;
};

type DispatchType = (args: ProductsAction) => ProductsAction;
