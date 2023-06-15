import { useEffect, useState } from 'react';

import { cycledTipMessages } from '../utils/reportLoadingUtils';

const useReportStoppingContent = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const localTimeoutId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => {
      clearTimeout(localTimeoutId);
    };
  }, []);

  return {
    selectedTipMsg: cycledTipMessages[currentTipIndex]
  };
};

export default useReportStoppingContent;
