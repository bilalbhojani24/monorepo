import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getScanRuns } from '../slices/dataSlice';
import { getScanRunCommonData, getScanRunData } from '../slices/selector';

export default function useScanDetails() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const scanRunData = useSelector(getScanRunData);
  const scanRunDataCommon = useSelector(getScanRunCommonData);
  const tabChangeHandler = (tab) => {
    setActiveTab(tab.name);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getScanRuns());
  }, [dispatch]);

  useEffect(() => {
    if (scanRunData?.data) {
      setIsLoading(false);
    }
  }, [scanRunData]);
  return {
    tabChangeHandler,
    activeTab,
    scanRunData,
    isLoading,
    scanRunDataCommon
  };
}
