import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';

import {
  addElapsedRecordingDuration,
  getLatestSessionStatus,
  getRecordingDurationElapsed,
  setRecordingTimerIntervalId
} from '../slices/reportLoadingSlice';

const useReportLoadingSidebar = () => {
  const dispatch = useDispatch();

  const sessionState = useSelector(getLatestSessionStatus);

  const secondsElapsed = useSelector(getRecordingDurationElapsed);

  useEffect(() => {
    if (sessionState === REPORT_LOADING_STATES.RECORDING) {
      dispatch(
        setRecordingTimerIntervalId(
          setInterval(() => {
            dispatch(addElapsedRecordingDuration(1));
          }, 1000)
        )
      );
    }

    return () => {
      dispatch(setRecordingTimerIntervalId(null));
    };
  }, [dispatch, sessionState]);

  return { sessionState, secondsElapsed };
};

export default useReportLoadingSidebar;
