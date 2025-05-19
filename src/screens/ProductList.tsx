import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { ListView } from '../components';


const useFetchProducts = (url: string) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch(`https://fakestoreapi.com/${url}`)
      .then(response => response.json())
      .then(data => { setIsLoading(false); setData(data) }).catch(err => { setError(err) });
  }, []);

  return [data, error, isLoading];
}

const dataTransform = (data: any[] = []) => {
  return data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      rating: item.rating.rate,
      image: item.image
    }
  })
}

function ProductList() {
  const [data, error, isLoading]: any[] = useFetchProducts('/products');

  const [productList, setProductList] = React.useState<any[]>([]);

  const columns = [
    { field: 'title', headerName: 'Product Title', width: 200 },
    { field: 'price', headerName: 'Product Price', width: 200 },
    { field: 'rating', headerName: 'Product Rating', width: 200 },
    { field: 'image', headerName: 'Product Image', width: 200, isImageUrl: true, imageProperties: { width: 150, height: 150 } }
  ];

  useEffect(() => {
    if (data && data.length > 0) {
      setProductList(dataTransform(data));
    }
  }, [data]);

  const handleSortBy = (fieldName: string, direction: string) => {
    const sortedRows = [...productList].sort((a: any, b: any) => {
      if (direction === 'asc') {
        return a[fieldName] - b[fieldName];
      } else {
        return b[fieldName] - a[fieldName];
      }
    });
    setProductList(sortedRows);
  }

  const gridRenderView = (item: any, index: number) => {
    const { title, price, rating, image } = item;
    return <>
      <div key={index}>
        <img src={image} alt={title} loading='lazy' width={200} height={200} />
      </div>
      <div className='text-overflow'>
        <h5>{title}</h5>
      </div>
      <div className='flex__space_btn'>
        <div>Price: {price}</div>
        <div>Rating: {rating}</div>
      </div>
    </>
  }

  return (<>
    <Box sx={{ mt: 8, fontSize: '1.5rem', height: '10vh' }}>
      <h5>My Products</h5>
      <Box sx={{ width: 'fit-content' }}>
        <ListView rows={productList} columns={columns} handleSort={handleSortBy} gridViewRender={gridRenderView} loading={isLoading} />
      </Box>
    </Box>
  </>
  )
}

export default ProductList