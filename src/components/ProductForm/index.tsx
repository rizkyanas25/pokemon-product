import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Autocomplete,
  CircularProgress
} from '@mui/material';

import { PokeBall } from '../../assets/Images';

function ProductForm() {
  const localProducts: readonly IProduct[] = useSelector(
    (state: ProductsState) => state.products
  );
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(1);
  const [stock, setStock] = useState<number>(1);
  const [pokeData, setPokeData] = useState<unknown>(null);
  const [pokeOptions, setPokeOptions] = useState<unknown[]>([]);

  const getAllPoke = async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );
    const data = await response.json();
    console.log('data.results => ', data.results);
    const temp: unknown[] = [];
    data.results.forEach((el: unknown, id: number) => {
      temp.push({ label: el.name.toUpperCase(), id: id, url: el.url });
    });
    setPokeOptions(temp);
  };

  const getPoke = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log('data => ', data);
  };

  const submitProduct = () => {
    const data = {
      id: localProducts.length + 1,
      name,
      price,
      stock,
      pokeData
    };
    console.log('data', data);
  };

  useEffect(() => {
    getAllPoke();
  }, []);

  return (
    <form
      className='flex flex-col gap-4 items-center w-full'
      onSubmit={
        name && price > 1 && stock > 1 && pokeData ? submitProduct : () => {}
      }
    >
      <p>Add New Product</p>
      <TextField
        className='w-full'
        label='Name'
        type='text'
        variant='outlined'
        onChange={(e) => setName(e.target.value)}
        error={name.length > 15}
        helperText={name.length > 15 ? 'Max name length 16 characters.' : ''}
      />
      <TextField
        className='w-full'
        label='Price'
        type='number'
        variant='outlined'
        onChange={(e) => setPrice(parseInt(e.target.value))}
        error={price < 1}
        helperText={price < 1 ? 'Min price is 1' : ''}
      />
      <TextField
        className='w-full'
        label='Stock'
        type='number'
        variant='outlined'
        onChange={(e) => setStock(parseInt(e.target.value))}
        error={stock < 1}
        helperText={stock < 1 ? 'Min stock is 1' : ''}
      />
      <Autocomplete
        disablePortal
        options={pokeOptions}
        className='w-full'
        loading={pokeOptions.length === 0}
        onChange={(e, value) => getPoke(value.url)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search Pokemon'
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {pokeOptions.length === 0 ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                )
              }
            }}
          />
        )}
      />
      <Button
        className='flex gap-2 items-center'
        variant='outlined'
        onClick={submitProduct}
        disabled={!name || price < 1 || stock < 1 || !pokeData}
      >
        <img className='w-5 h-5' src={PokeBall} alt='pokeball' />
        Add Product
      </Button>
    </form>
  );
}

export default ProductForm;
