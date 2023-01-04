import { useState, useEffect } from 'react';
import usePrevious from './usePrevious';
import useWindowSize from './useWindowSize';

const useWindowDimensionChange = () => {
  const windowSize = useWindowSize();
  const previousWindowWidth = usePrevious(windowSize.width);

  const [isWindowWidthIncreasing, setWindowDimension] = useState(false);

  useEffect(() => {
    const newWindowWidth = window.innerWidth;

    if (newWindowWidth > previousWindowWidth) {
      setWindowDimension(true);
    } else if (newWindowWidth < previousWindowWidth) {
      setWindowDimension(false);
    }
  }, [previousWindowWidth, windowSize.width]);

  return isWindowWidthIncreasing;
};

export default useWindowDimensionChange;
