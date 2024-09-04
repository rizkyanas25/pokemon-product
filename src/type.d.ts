interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  pokeData: never;
}

type ProductsState = {
  products: IProduct[];
};

type ProductsAction = {
  type: string;
  product: IProduct;
};

type DispatchType = (args: ProductsAction) => ProductsAction;
