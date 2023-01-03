import { useEffect, useState } from 'react';

import { getInitialAndFinalFocusableElementRef } from '@browserstack/utils';
import useFocusTrap from '../useFocusTrap';

const useGetFocusElementsAndTrap = (parentRef, reTrapFocus) => {
  const [firstEle, setFirstEle] = useState(null);
  const [lastEle, setLastEle] = useState(null);

  useFocusTrap(parentRef, firstEle, lastEle);

  useEffect(() => {
    const [firstFocusElement, lastFocusElement] = getInitialAndFinalFocusableElementRef(parentRef.current);
    if (firstFocusElement || lastFocusElement) {
      setFirstEle(firstFocusElement);
      setLastEle(lastFocusElement);
    }
    if (reTrapFocus?.shouldFocusFirstElement) {
      firstFocusElement?.current?.focus();
    }
  }, [parentRef, reTrapFocus]);
};

export default useGetFocusElementsAndTrap;
