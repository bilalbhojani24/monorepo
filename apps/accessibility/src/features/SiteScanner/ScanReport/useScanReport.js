import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import { fetchConsolidatedData } from 'api/siteScannerScanReports';

import { resetReportAppInfo } from '../slices/appSlice';
import {
  getScanLogs,
  setCustomData,
  setOverviewData
} from '../slices/dataSlice';
import {
  getScanLogsData,
  getScanReportCommonData,
  getScanReportMetaData,
  getScanReportOverviewData
} from '../slices/selector';

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
  const [isCopied, setIsCopied] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const scanLogsData = useSelector(getScanLogsData);
  const reportCommonData = useSelector(getScanReportCommonData);
  const reportOverviewData = useSelector(getScanReportOverviewData);
  const reportMetaData = useSelector(getScanReportMetaData);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    setActiveTab(tab);
    setActiveTabIndex(tabsOptions[tab]?.index || 0);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    const reportIDList = searchParams.get('id');
    dispatch(getScanLogs(reportIDList));

    setIsLoading(true);
    Promise.all([fetchCustomData(), fetchConsolidatedData(reportIDList)]).then(
      ([customData, overviewData]) => {
        dispatch(setCustomData(customData.data));
        dispatch(setOverviewData(overviewData.data));
        const dataObject = {
          reportType: 'Individual',
          issueCount: overviewData?.issueSummary?.issueCount,
          pageCount: overviewData?.issueSummary?.pageCount,
          componentCount: overviewData?.issueSummary?.componentCount
        };
        // logEvent('OnADReportView', dataObject);
        setIsLoading(false);
      }
    );
    return () => {
      dispatch(resetReportAppInfo());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (scanLogsData?.data?.logs) {
      setIsLoading(false);
      setScanLogsStateData({ ...scanLogsData.data });
    }
  }, [scanLogsData]);

  /*
    Tab Change Handler
  */
  const onTabChange = (tab) => {
    setActiveTab(tab.id);
    navigate({
      search: `?id=${searchParams.id}tab=${tab.id}`
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
    onFilterApplied,
    reportOverviewData,
    isCopied,
    setIsCopied,
    reportMetaData
  };
}
