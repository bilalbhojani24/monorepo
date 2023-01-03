import { useRef, useLayoutEffect } from 'react';

export default function useBodyClass(classNames) {
  const classNamesAdded = useRef([]);
  useLayoutEffect(() => {
    const classNamesArr = classNames.split(' ').filter(Boolean);
    document.body.classList.add(...classNamesArr);
    classNamesAdded.current = classNamesArr;
    return () => document.body.classList.remove(...classNamesAdded.current);
  }, [classNames]);
}
