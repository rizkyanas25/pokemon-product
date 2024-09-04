import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box, Typography } from '@mui/material';

import { PokeBall } from '../../assets/Images';
import { ProductForm } from '../../components';

function Products() {
  const [isOpenModal, setIsOpenModal] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const localProducts: readonly IProduct[] = useSelector(
    (state: ProductsState) => state.products
  );

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  useEffect(() => {
    // const arr = [];
    // for (let i = 0; i < 30; i++) {
    //   arr.push({
    //     id: i + '',
    //     name: 'Abc',
    //     price: 1,
    //     stock: 1
    //   });
    // }
    // setProducts(arr);
    console.log('localProducts', localProducts);
  }, []);

  return (
    <div className='w-full h-full flex flex-col gap-7 relative'>
      <div
        className='hover-opacity flex gap-2 p-2 items-center bg-yellow-200 absolute right-4 bottom-4'
        style={{ borderRadius: '20px 0px 0px 20px' }}
        onClick={() => setIsOpenModal('add')}
      >
        <img src={PokeBall} className='w-5 h-5' alt='pokeball' />
        <span className='text-blue-500 font-bold'>Add New Product</span>
      </div>

      <div className='w-full h-20 border rounded-xl'></div>

      <div className='w-full h-full border rounded-xl overflow flex flex-wrap p-7 gap-7'>
        {products.length > 0 &&
          products.map((el: IProduct, id: number) => {
            return (
              <div
                key={id}
                className='p-4 rounded-xl product-card hover-opacity border border-1 border-gray-200'
              >
                <p>{el.name}</p>
              </div>
            );
          })}
      </div>

      <Modal
        open={isOpenModal !== null}
        onClose={() => setIsOpenModal(null)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>{isOpenModal == 'add' && <ProductForm />}</Box>
      </Modal>
    </div>
  );
}

export default Products;
