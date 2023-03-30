import { useEffect, useState } from 'react';

const useTextTransformer = ({ textRef, text }) => {
  const [transformedText, setTransformedText] = useState(null);

  useEffect(() => {
    if (textRef.current?.clientWidth < textRef.current?.scrollWidth) {
      const textArray = text.split('/');
      setTransformedText(`/../${textArray[textArray.length - 2]}/`);
    } else setTransformedText(null);
  }, [textRef, text]);

  return { transformedText };
};

export default useTextTransformer;
