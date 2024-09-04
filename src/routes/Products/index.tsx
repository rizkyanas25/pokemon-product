import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box } from '@mui/material';
import {
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
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
  const [sortBy, setSortBy] = useState<string>('price');
  const [sort, setSort] = useState<string>('asc');

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

  const sortedProducts = () => {
    let temp: IProduct[] = [];
    if (search) {
      localProducts.forEach((el) => {
        if (el.name.includes(search)) {
          temp.push(el);
        }
      });
    } else {
      temp = [...localProducts];
    }
    if (sortBy === 'price') {
      if (sort == 'asc') {
        temp.sort((a, b) => b.price - a.price);
      } else {
        temp.sort((a, b) => a.price - b.price);
      }
    } else {
      if (sort == 'asc') {
        temp.sort((a, b) => a.stock - b.stock);
      } else {
        temp.sort((a, b) => b.stock - a.stock);
      }
    }

    return temp;
  };

  const handleSortBy = (event: ChangeEvent<HTMLInputElement>) => {
    setSortBy((event.target as HTMLInputElement).value);
  };

  const handleSort = (event: ChangeEvent<HTMLInputElement>) => {
    setSort((event.target as HTMLInputElement).value);
  };

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

      <div className='w-full flex justify-between'>
        <TextField
          className='rounded-xl'
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
        <div className='flex gap-4 items-center'>
          <FormControl style={{ display: 'flex' }}>
            <FormLabel id='demo-radio-buttons-group-label'>Sort by:</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='price'
              name='radio-buttons-group'
              value={sortBy}
              onChange={handleSortBy}
            >
              <FormControlLabel
                value='price'
                control={<Radio />}
                label='Price'
              />
              <FormControlLabel
                value='stock'
                control={<Radio />}
                label='Stock'
              />
            </RadioGroup>
          </FormControl>
          <FormControl style={{ display: 'flex' }}>
            <FormLabel id='demo-radio-buttons-group-label'>Sort:</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='asc'
              name='radio-buttons-group'
              value={sort}
              onChange={handleSort}
            >
              <FormControlLabel value='asc' control={<Radio />} label='Asc' />
              <FormControlLabel value='desc' control={<Radio />} label='Desc' />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className='w-full h-full border rounded-xl overflow flex flex-wrap p-7 gap-7'>
        {sortedProducts().length > 0 &&
          sortedProducts().map((el: IProduct, id: number) => {
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
