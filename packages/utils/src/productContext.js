import React from 'react';
import getProduct from './getProductUnderScored';

const ProductContext = React.createContext(getProduct());

export default ProductContext;
