import { useEffect, useState } from 'react';

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
