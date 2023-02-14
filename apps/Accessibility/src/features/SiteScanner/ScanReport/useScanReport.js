import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getScanLogs } from '../slices/dataSlice';
import { getScanLogsData, getScanReportCommonData } from '../slices/selector';

const tabsOptions = {
  SUMMARY: { name: 'Summary', id: 'SUMMARY', index: 0 },
  ALLISSUES: { name: 'All Issues', id: 'ALLISSUES', index: 1 },
  SCANLOGS: { name: 'Scan Logs', id: 'SCANLOGS', index: 2 }
};

export default function useScanReport() {
  // Local State
  const [isLoading, setIsLoading] = useState(false);
  const [scanLogsStateData, setScanLogsStateData] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Redux
  const dispatch = useDispatch();
  const scanLogsData = useSelector(getScanLogsData);
  const reportCommonData = useSelector(getScanReportCommonData);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    setActiveTab(tab);
    setActiveTabIndex(tabsOptions[tab]?.index || 0);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getScanLogs());
  }, [dispatch]);

  useEffect(() => {
    if (scanLogsData?.logs) {
      setIsLoading(false);
      setScanLogsStateData({ ...scanLogsData });
    }
  }, [scanLogsData]);

  /*
    Tab Change Handler
  */
  const onTabChange = (tab) => {
    setActiveTab(tab.id);
    navigate({
      search: `?tab=${tab.id}`
    });
    setActiveTabIndex(tab.index);
  };

  /*
    Scan Logs Filter Applied
  */
  const onFilterApplied = (e) => {
    let scanLogsStateDataCpy = { ...scanLogsStateData };
    if (e.length) {
      e.forEach((option) => {
        scanLogsStateDataCpy.logs = scanLogsStateDataCpy.logs.filter(
          (log) => option.value === log.pageStatus
        );
      });
    } else {
      scanLogsStateDataCpy = { ...scanLogsData };
    }
    setScanLogsStateData(scanLogsStateDataCpy);
  };

  return {
    activeTab,
    onTabChange,
    activeTabIndex,
    tabsOptions,
    isLoading,
    reportCommonData,
    scanLogsStateData,
    onFilterApplied
  };
}
