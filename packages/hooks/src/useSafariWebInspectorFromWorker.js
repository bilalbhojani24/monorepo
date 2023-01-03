import { useRef } from 'react';
import useMountEffect from './useMountEffect';

export default function useSafariWebInspectorFromWorker() {
  const worker = useRef();

  const mountFunc = () => {
    worker.current = new Worker('non-compiled-js/devtools.worker.js');
    const devToolsUrls = DevTools.createAllWebInspectorURLs();
    devToolsUrls.forEach((url) => {
      worker.current.postMessage({ url });
    });
    worker.current.onmessage = () => {};
  };
  const unmountFunc = () => worker.current?.terminate();

  useMountEffect(mountFunc, unmountFunc);
}
