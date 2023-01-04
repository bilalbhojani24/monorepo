import { useRef, useEffect } from 'react';

/*
  This hook returns an object whose current property is a boolean value indicating whether the component has been unmounted.
*/

const useIsUnmounted = () => {
  const ref = useRef(false);
  useEffect(
    () => () => {
      ref.current = true;
    },
    []
  );
  return ref;
};

export default useIsUnmounted;
