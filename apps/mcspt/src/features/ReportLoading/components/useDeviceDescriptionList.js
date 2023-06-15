import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionDetails } from 'features/Home';

import { generateTestDataDescriptionList } from '../utils/reportLoadingUtils';

const useDeviceDescriptionList = () => {
  const sessionDetails = useSelector(getSessionDetails);

  const [testDataDescriptionList, setTestDataDescriptionList] = useState(null);

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

  return {
    sessionDetails,
    testDataDescriptionList
  };
};

export default useDeviceDescriptionList;
