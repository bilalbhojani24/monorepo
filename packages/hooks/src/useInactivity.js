import { useCallback, useRef } from 'react';

import { INACTIVITY_TIME_LIMIT } from '@browserstack/utils/constants';
import useMountEffect from './useMountEffect';

const useInactivity = (inactivityCb = () => {}, ignoreTrackingSelector, inactivityTime = INACTIVITY_TIME_LIMIT) => {
  const timerRef = useRef();

  const startTracker = useCallback(
    (e) => {
      if (e?.target?.closest?.(ignoreTrackingSelector)) {
        return;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        inactivityCb();
      }, inactivityTime);
    },
    [ignoreTrackingSelector, inactivityCb, inactivityTime]
  );

  const attachListener = () => {
    document.addEventListener('DOMContentLoaded', startTracker, true);
    document.addEventListener('mousedown', startTracker, true);
  };
  const removeListener = () => {
    document.removeEventListener('mousedown', startTracker, true);
  };

  useMountEffect(attachListener, removeListener);

  return startTracker;
};

export default useInactivity;
