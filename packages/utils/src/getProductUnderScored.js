import getProduct from './getProduct';

const getProductUnderScored = () => {
  return getProduct().replace('-', '_');
};

export default getProductUnderScored;
