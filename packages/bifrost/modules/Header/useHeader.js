import { useCallback, useEffect, useRef, useState } from 'react';

export default function useHeader() {
  const headerRef = useRef();
  const [productsToShow, setProductsToShow] = useState(0);

  const productToShowCalculation = useCallback(() => {
    const headerWidth = headerRef.current?.getBoundingClientRect().width;
    const headerBrandWidth = document
      .getElementById('header-brand')
      ?.getBoundingClientRect().width;
    const headerElementsWidth = document
      .getElementById('header-elements')
      ?.getBoundingClientRect().width;
    const headerProductWidth = 84;
    const spaceLeftToShowProducts =
      headerWidth -
      headerBrandWidth -
      headerElementsWidth -
      headerProductWidth -
      64;

    if (spaceLeftToShowProducts < 132) {
      setProductsToShow(0);
    } else if (spaceLeftToShowProducts > 131 && spaceLeftToShowProducts < 208) {
      setProductsToShow(2);
    } else {
      setProductsToShow(3);
    }
  }, []);

  useEffect(() => {
    productToShowCalculation();
    window.addEventListener('resize', productToShowCalculation);

    return () => {
      window.removeEventListener('resize', productToShowCalculation);
    };
  }, [productToShowCalculation]);

  return {
    productsToShow,
    headerRef
  };
}
