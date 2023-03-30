import { useState } from 'react';

const useTextTransformer = ({ text, isOverflowing }) => {
  const [transformedText, setTransformedText] = useState();

  if (isOverflowing) {
    const textArray = text.split('/');
    setTransformedText(
      `/${textArray[1]}../${textArray[textArray.length - 2]}/`
    );
  } else setTransformedText(text);

  return transformedText;
};

export default useTextTransformer;
