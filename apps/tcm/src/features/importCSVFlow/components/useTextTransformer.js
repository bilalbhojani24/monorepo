import { useEffect, useRef } from 'react';

const useTextTransformer = ({ text }) => {
  const textRef = useRef();

  useEffect(() => {
    if (textRef.current?.clientWidth < textRef.current?.scrollWidth) {
      const textArray = text.split('/');
      textRef.current.textContent = `../${textArray[textArray.length - 2]}/`;
    }
  }, [text]);

  return { textRef };
};

export default useTextTransformer;
