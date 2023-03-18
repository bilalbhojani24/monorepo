import { useEffect, useState } from 'react';

const useResizeObserver = (ref) => {
  // on newer browsers this will return blockSize && inlineSize
  // on older browsers this will return height && width
  const [contentRect, setContentRect] = useState({});
  useEffect(() => {
    const observeTarget = ref.current;
    let resizeObserver;

    (async () => {
      if ('ResizeObserver' in window === false) {
        // Loads polyfill asynchronously, only if required.
        const module = await import('@juggle/resize-observer');
        window.ResizeObserver = module.ResizeObserver;
      }
      // Uses native or polyfill, depending on browser support.
      resizeObserver = new ResizeObserver((entries) => {
        // reading only 0th index because only one element is observed at once with this hook
        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect
        // contentRect may be deprecated in the future
        const contentBoxSizeProperties = entries[0].contentBoxSize?.[0];
        const properties = contentBoxSizeProperties
          ? {
              blockSize: contentBoxSizeProperties.blockSize,
              inlineSize: contentBoxSizeProperties.inlineSize
            }
          : {
              height: entries[0].contentRect.height,
              width: entries[0].contentRect.width
            };
        setContentRect(properties);
      });
      if (observeTarget) {
        resizeObserver.observe(observeTarget);
      }
    })();

    return () => {
      resizeObserver?.disconnect();
    };
  }, [ref]);
  return contentRect;
};

export default useResizeObserver;
