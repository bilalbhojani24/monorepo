import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionDetails } from 'features/Home';

import {
  getIsSessionStopInProgress,
  getLatestSessionStatus
} from '../slices/reportLoadingSlice';
import {
  cycledTipMessages,
  generateTestDataDescriptionList
} from '../utils/reportLoadingUtils';

const useReportLoadingContent = () => {
  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);
  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);

  const [testDataDescriptionList, setTestDataDescriptionList] = useState(null);

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    setTestDataDescriptionList(
      generateTestDataDescriptionList(sessionDetails?.device)
    );
  }, [sessionDetails?.device]);

  useEffect(() => {
    if (sessionDetails?.cellular) {
      setTestDataDescriptionList((existingList) => {
        if (existingList?.length > 0) {
          const updatedVal = [...existingList];

          updatedVal[updatedVal.length - 1].value = sessionDetails?.cellular;

          return updatedVal;
        }
        return existingList;
      });
    }
  }, [sessionDetails]);

  useEffect(() => {
    const localTimeoutId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => {
      clearTimeout(localTimeoutId);
    };
  }, []);

  return {
    sessionState,
    sessionDetails,
    isSessionStopInProgress,
    testDataDescriptionList,
    selectedTipMsg: cycledTipMessages[currentTipIndex]
  };
};

export default useReportLoadingContent;
