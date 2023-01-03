import { useState, useEffect } from 'react';
import { getInitialAndFinalFocusableElementRef } from '@browserstack/utils';
import useFocusTrap from './useFocusTrap';

const useHandleFocusForSpotlights = (parentRef, currentStep) => {
  const [firstEle, setFirstEle] = useState(null);
  const [lastEle, setLastEle] = useState(null);

  useFocusTrap(parentRef, firstEle, lastEle);
  useEffect(() => {
    const [firstFocusElement, lastFocusElement] = getInitialAndFinalFocusableElementRef(parentRef.current);
    if (firstFocusElement || lastFocusElement) {
      setFirstEle(firstFocusElement);
      setLastEle(lastFocusElement);
    }
  }, [parentRef, currentStep]);
};

export default useHandleFocusForSpotlights;
