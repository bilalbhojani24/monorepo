import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../../Report';

const useScreenLoadTime = () => {
  const sessionData = useSelector(getSessionMetrics);

  const splitActivityName = (name) => {
    if (name) {
      const fragments = name?.split('/');

      return fragments[fragments.length - 1];
    }

    return '';
  };

  return { sessionData, splitActivityName };
};

export default useScreenLoadTime;
