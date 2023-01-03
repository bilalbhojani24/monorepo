import { useEffect, useCallback } from 'react';

/**
 * This hook is used to handle and manage focus on the given elements refs in a cyclic order.
 * The elements are refs for the rendered elements.
 */
const useFocusTrap = (parentRef, firstEle, lastEle, lastEleSubstituteEle) => {
  const handleBackwardTab = useCallback(
    (e) => {
      if (document.activeElement === firstEle.current) {
        e.preventDefault();
        if (lastEle.current.disabled) {
          lastEleSubstituteEle.current.focus();
        } else {
          lastEle.current.focus();
        }
      }
    },
    [firstEle, lastEle, lastEleSubstituteEle]
  );
  const handleForwardTab = useCallback(
    (e) => {
      const currentLastActiveElement = lastEle.current.disabled ? lastEleSubstituteEle.current : lastEle.current;
      if (document.activeElement === currentLastActiveElement) {
        e.preventDefault();
        firstEle.current.focus();
      }
    },
    [firstEle, lastEle, lastEleSubstituteEle]
  );

  const keydownHandler = useCallback(
    (e) => {
      const KEY_TAB = 9;

      switch (e.keyCode) {
        case KEY_TAB:
          // Retain the focus on the currently focussed element only
          if (!lastEle || !lastEle.current) {
            e.preventDefault();
            break;
          }

          // Handle cyclic focus on the given elements
          if (e.shiftKey) {
            handleBackwardTab(e);
          } else {
            handleForwardTab(e);
          }

          break;
        default:
          break;
      }
    },
    [lastEle, handleBackwardTab, handleForwardTab]
  );

  useEffect(() => {
    const parentEle = parentRef.current;
    parentEle.addEventListener('keydown', keydownHandler);
    return () => {
      parentEle.removeEventListener('keydown', keydownHandler);
    };
  }, [keydownHandler, parentRef]);
};

export default useFocusTrap;
