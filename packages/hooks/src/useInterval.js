import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}
