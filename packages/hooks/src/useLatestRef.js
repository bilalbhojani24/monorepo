import { useEffect, useRef } from 'react';

/*
  This hook returns a ref object that always points to the latest value passed to it.
  Wrapping your function / data in useLatestRef() will ensure that it is stale closure free.
  This is useful if we want to use the function in effect / pass it to another component.
*/

const useLatestRef = (data) => {
  const ref = useRef(data);
  useEffect(() => {
    ref.current = data;
  });
  return ref;
};

export default useLatestRef;
