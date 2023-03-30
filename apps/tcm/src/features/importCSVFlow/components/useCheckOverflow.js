import { useEffect, useState } from 'react';

const useCheckOverflow = ({ textRef, text }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current?.clientWidth < textRef.current?.scrollWidth)
      setIsOverflowing(true);
    else setIsOverflowing(false);
  }, [textRef, text]);

  return { isOverflowing };
};

export default useCheckOverflow;
