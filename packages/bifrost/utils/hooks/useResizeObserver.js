import { useEffect, useState } from 'react';

const useCaptureDimension = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const { inlineSize: width, blockSize: height } =
        entries[0].borderBoxSize[0];
      setDimensions({ width, height });
    });

    observer.observe(ref.current);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return dimensions;
};

export default useCaptureDimension;
