import { useContext } from 'react';
import { productContext as ProductContext } from '@browserstack/utils';

const useProduct = () => {
  const product = useContext(ProductContext);
  return product;
};

export default useProduct;
