/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  TextField,
  Button,
  Autocomplete,
  CircularProgress
} from '@mui/material';

import { PokeBall } from '../../assets/Images';
import {
  addProduct,
  editProduct,
  removeProduct
} from '../../store/actionCreators';

function ProductForm(props: any) {
  const isEdit = props.product ? true : false;
  const dispatch: Dispatch<any> = useDispatch();
  const localProducts: readonly IProduct[] = useSelector(
    (state: ProductsState) => state.products
  );
  const [name, setName] = useState<string>(
    props.product ? props.product.name : ''
  );
  const [price, setPrice] = useState<number>(
    props.product ? props.product.price : 1
  );
  const [stock, setStock] = useState<number>(
    props.product ? props.product.stock : 1
  );
  const [pokeData, setPokeData] = useState<any>(
    props.product ? props.product.pokeData : null
  );
  const [pokeOptions, setPokeOptions] = useState<any[]>([]);
  const [isLoadingPoke, setIsLoadingPoke] = useState<boolean>(false);

  const getAllPoke = async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );
    const data = await response.json();
    const temp: any[] = [];
    data.results.forEach((el: any, id: number) => {
      temp.push({ label: el.name.toUpperCase(), id: id, url: el.url });
    });
    setPokeOptions(temp);
  };

  const getPoke = async (url: string) => {
    setPokeData(null);
    setIsLoadingPoke(true);
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    setTimeout(() => {
      setIsLoadingPoke(false);
      setPokeData(data);
    }, 500);
  };

  const submitProduct = () => {
    const data = {
      id: localProducts.length + 1,
      name,
      price,
      stock,
      pokeData
    };
    dispatchSubmitProduct(data);
  };

  const dispatchSubmitProduct = useCallback(
    (product: IProduct) => {
      dispatch(addProduct(product));
      props.setIsOpenModal(null);
    },
    [dispatch, props]
  );

  const changeProduct = (id: any) => {
    const data = {
      id: id,
      name,
      price,
      stock,
      pokeData
    };
    dispatchEditProduct(data);
  };

  const dispatchEditProduct = useCallback(
    (product: IProduct) => {
      dispatch(editProduct(product));
      props.setIsOpenModal(null);
    },
    [dispatch, props]
  );

  const deleteProduct = (id: any) => {
    const data = {
      id: id,
      name,
      price,
      stock,
      pokeData
    };
    dispatchRemoveProduct(data);
  };

  const dispatchRemoveProduct = useCallback(
    (product: IProduct) => {
      dispatch(removeProduct(product));
      props.setIsOpenModal(null);
    },
    [dispatch, props]
  );

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
      <p>{isEdit ? 'Edit' : 'Add New'} Product</p>
      <TextField
        className='w-full'
        label='Name'
        type='text'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={name.length > 15}
        helperText={name.length > 15 ? 'Max name length 16 characters.' : ''}
      />
      <TextField
        className='w-full'
        label='Price'
        type='number'
        variant='outlined'
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
        error={price < 1}
        helperText={price < 1 ? 'Min price is 1' : ''}
      />
      <TextField
        className='w-full'
        label='Stock'
        type='number'
        variant='outlined'
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        error={stock < 1}
        helperText={stock < 1 ? 'Min stock is 1' : ''}
      />
      <Autocomplete
        disablePortal
        options={pokeOptions}
        className='w-full'
        loading={pokeOptions.length === 0}
        onChange={(e: any, value: any) =>
          value ? getPoke(value.url) : setPokeData(null)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={isEdit ? 'Change Pokemon' : 'Search Pokemon'}
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
      {isLoadingPoke && (
        <CircularProgress className='my-7' color='inherit' size={50} />
      )}
      {pokeData && (
        <div className='flex gap-4 items-center'>
          <img src={pokeData.sprites.front_default} alt='' />
          <img src={pokeData.sprites.back_default} alt='' />
        </div>
      )}
      <Button
        className='flex gap-2 items-center'
        variant='outlined'
        onClick={() => {
          isEdit ? changeProduct(props.product.id) : submitProduct();
        }}
        disabled={!name || price < 1 || stock < 1 || !pokeData}
      >
        <img className='w-5 h-5' src={PokeBall} alt='pokeball' />
        {isEdit ? 'Edit' : 'Add'} Product
      </Button>
      {isEdit && (
        <Button
          className='flex gap-2 items-center'
          variant='outlined'
          onClick={deleteProduct}
          color='warning'
        >
          <img className='w-5 h-5' src={PokeBall} alt='pokeball' />
          Delete Product
        </Button>
      )}
    </form>
  );
}

export default ProductForm;
