import { useEffect, useState } from 'react';

const useTextTransformer = ({ textRef, text }) => {
  const [transformedText, setTransformedText] = useState(text);

  useEffect(() => {
    if (textRef.current?.clientWidth < textRef.current?.scrollWidth) {
      const textArray = text.split('/');
      setTransformedText(`/../${textArray[textArray.length - 2]}/`);
    } else setTransformedText(text);
  }, [textRef, text]);

  return { transformedText };
};

export default useTextTransformer;
