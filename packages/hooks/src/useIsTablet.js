import { useState, useEffect } from 'react';

// 979px: This is breakpoints decided by the design team for the tablet view
const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 979 && window.innerWidth > 639);

  function handleSizeChange() {
    return setIsTablet(window.innerWidth <= 979 && window.innerWidth > 639);
  }

  useEffect(() => {
    window.addEventListener('resize', handleSizeChange);

    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [isTablet]);

  return isTablet;
};

export default useIsTablet;
