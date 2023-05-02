import { useEffect, useState } from 'react';

const useImageModal = ({ imageLink }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageLink) {
      setIsLoading(true);
      const img = new Image();
      img.onload = function () {
        setIsLoading(false);
      };
      img.src = imageLink;
    }
  }, [imageLink]);

  return { isLoading };
};

export default useImageModal;
