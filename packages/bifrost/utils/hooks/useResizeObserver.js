import { useEffect, useState } from 'react';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const { inlineSize: width, blockSize: height } =
        entries[0].borderBoxSize[0];

      setDimensions({ width, height });
    });

    observer.observe(ref.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref]);

  return dimensions;
};

export default useResizeObserver;
