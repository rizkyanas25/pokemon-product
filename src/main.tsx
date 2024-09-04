import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './routes/root';
import ErrorPage from './routes/errorPage';
import Products from './routes/Products';

import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'products',
        element: <Products />
      }
    ]
  }
]);

const store: Store<ProductsState, ProductsAction> & {
  dispatch: DispatchType;
} = configureStore({ reducer });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
