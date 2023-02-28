import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getScanOverview, getScanRuns } from '../slices/dataSlice';
import {
  getScanOverviewData,
  getScanRunCommonData,
  getScanRunData
} from '../slices/selector';

const tabsOptions = {
  OVERVIEW: { name: 'Overview', id: 'OVERVIEW', index: 0 },
  SCANRUNS: { name: 'Scan runs', id: 'SCANRUNS', index: 1 }
};

export default function useScanDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const scanRunData = useSelector(getScanRunData);
  const scanRunDataCommon = useSelector(getScanRunCommonData);
  const scanOverviewData = useSelector(getScanOverviewData);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab') || tabsOptions.OVERVIEW.id;
    console.log(tab);
    setActiveTab(tab);
    setActiveTabIndex(tabsOptions[tab]?.index || 0);
  }, [searchParams]);

  useEffect(() => {
    // const tab = searchParams.get('tab');
    setIsLoading(true);
    dispatch(getScanOverview(2));
    dispatch(getScanRuns());
  }, [dispatch]);

  useEffect(() => {
    if (scanRunData?.data) {
      setIsLoading(false);
    }
  }, [scanRunData]);

  const tabChangeHandler = (tab) => {
    console.log(tab);
    setActiveTab(tab.id);
    navigate({
      search: `?tab=${tab.id}`
    });
    setActiveTabIndex(tab.index);
  };

  return {
    tabChangeHandler,
    activeTab,
    scanRunData,
    isLoading,
    scanRunDataCommon,
    scanOverviewData,
    activeTabIndex
  };
}
