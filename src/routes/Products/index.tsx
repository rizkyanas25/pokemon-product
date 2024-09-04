import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import { PokeBall } from '../../assets/Images';
import { ProductForm } from '../../components';
import currencyParser from '../../helpers/currencyParser';

function Products() {
  const [isOpenModal, setIsOpenModal] = useState<string | null>(null);
  const localProducts: readonly IProduct[] = useSelector(
    (state: ProductsState) => state.products
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openProducts, setOpenProducts] = useState<IProduct | null>(null);
  const [search, setSearch] = useState<string>('');

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
    console.log('localProducts', localProducts);
    setProducts([...localProducts]);
  }, [localProducts]);

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

      <div className='w-full h-20 border rounded-xl'>
        <TextField
          className='w-full'
          label='Seach'
          type='number'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }
          }}
        />
      </div>

      <div className='w-full h-full border rounded-xl overflow flex flex-wrap p-7 gap-7'>
        {products.length > 0 &&
          products.map((el: IProduct, id: number) => {
            return (
              <div
                key={id}
                className='p-4 rounded-lg product-card hover-opacity border border-1 border-gray-200'
                onClick={() => {
                  setOpenProducts(el);
                  setIsOpenModal('open');
                }}
              >
                <p className='text-2xl font-bold text-poke-blue'>{el.name}</p>
                <p className='text-gray-300 capitalize text-poke-blue2'>
                  {el.pokeData.name}
                </p>
                <img
                  src={el.pokeData.sprites.front_default}
                  alt='front-sprites'
                  className='w-full h-auto -my-4'
                />
                <p className='font-bold text-xl'>
                  {currencyParser.format(el.price)}
                </p>
                <p className='text-xs'>In Stock: {el.stock}</p>
              </div>
            );
          })}
      </div>

      <Modal
        open={isOpenModal !== null}
        onClose={() => {
          setIsOpenModal(null);
          setOpenProducts(null);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          {isOpenModal == 'add' && (
            <ProductForm setIsOpenModal={setIsOpenModal} />
          )}
          {isOpenModal == 'open' && (
            <ProductForm
              setIsOpenModal={setIsOpenModal}
              product={openProducts}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Products;
