import { useState, useEffect } from 'react';

// 639px: This is breakpoints decided by the design team for the tablet view
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);

  function handleSizeChange() {
    return setIsMobile(window.innerWidth <= 639);
  }

  useEffect(() => {
    window.addEventListener('resize', handleSizeChange);

    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [isMobile]);

  return isMobile;
};

export default useIsMobile;
