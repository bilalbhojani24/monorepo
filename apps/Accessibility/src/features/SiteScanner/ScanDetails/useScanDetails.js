import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getScanOverview, getScanRuns } from '../slices/dataSlice';
import {
  getScanOverviewData,
  getScanRunCommonData,
  getScanRunData
} from '../slices/selector';

export default function useScanDetails() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const scanRunData = useSelector(getScanRunData);
  const scanRunDataCommon = useSelector(getScanRunCommonData);
  const scanOverviewData = useSelector(getScanOverviewData);
  const tabChangeHandler = (tab) => {
    setActiveTab(tab.name);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getScanOverview());
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
    scanRunDataCommon,
    scanOverviewData
  };
}
