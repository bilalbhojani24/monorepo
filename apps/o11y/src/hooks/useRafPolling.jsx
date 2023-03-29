import { useCallback, useEffect, useRef } from 'react';

const clearRafTimeout = (handle) => {
  if (handle) {
    cancelAnimationFrame(handle.id);
  }
};

const setRafTimeout = (callback, timeout) => {
  const interval = timeout < 0 ? 0 : timeout;
  const handle = {
    id: 0
  };

  const startTime = Date.now();

  const loop = () => {
    if (Date.now() - startTime >= interval) {
      callback();
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  };

  handle.id = requestAnimationFrame(loop);

  return handle;
};

const useRafPolling = (fn, timeout) => {
  const timerRef = useRef();
  const endedRef = useRef(false);

  const fnRef = useRef(fn);
  fnRef.current = fn;

  const end = useCallback(() => {
    endedRef.current = true;
    clearRafTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    (async function run() {
      await fnRef.current();
      if (!endedRef.current) {
        timerRef.current = setRafTimeout(run, timeout);
      }
    })();

    return () => {
      endedRef.current = true;
      clearRafTimeout(timerRef.current);
    };
  }, [timeout]);

  return end;
};

export default useRafPolling;
