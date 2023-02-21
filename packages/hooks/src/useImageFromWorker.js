import { useRef } from 'react';
import useMountEffect from './useMountEffect';

export default function useImageFromWorker(images, callback) {
  const worker = useRef();
  const imagesArray = [].concat(images ?? []);

  const mountFunc = () => {
    worker.current = new Worker('non-compiled-js/images.worker.js');
    imagesArray.forEach((image) => {
      worker.current.postMessage({ key: image.key, url: image.imgSrc });
    });

    worker.current.onmessage = (event) => callback(event.data);
  };
  const unmountFunc = () => worker.current?.terminate();

  useMountEffect(mountFunc, unmountFunc);
}
