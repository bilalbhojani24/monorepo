import { useEffect } from 'react';

const RootRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://www.browserstack.com/app-performance';
  }, []);

  return null;
};

export default RootRedirect;
