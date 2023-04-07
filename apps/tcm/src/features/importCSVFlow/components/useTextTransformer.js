import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@browserstack/hooks';

const useTextTransformer = ({ text }) => {
  const textRef = useRef();
  const windowSize = useWindowSize();
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current?.clientWidth < textRef.current?.scrollWidth) {
      const textArray = text.split('/');
      setIsOverflowing(true);
      setTimeout(() => {
        textRef.current.textContent = `/${textArray[1]}/../${
          textArray[textArray.length - 2]
        }`;
      }, 0);
    } else setIsOverflowing(false);
  }, [text, windowSize.width]);

  return { textRef, isOverflowing };
};

export default useTextTransformer;
