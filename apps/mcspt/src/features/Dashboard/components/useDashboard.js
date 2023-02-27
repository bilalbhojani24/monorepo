import { useEffect } from 'react';
import { pubSub } from '@browserstack/utils';

const useDashboard = () => {
  useEffect(() => {
    window.pubSub = pubSub();
  }, []);
};

export default useDashboard;
