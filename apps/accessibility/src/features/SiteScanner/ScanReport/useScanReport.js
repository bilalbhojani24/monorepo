import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import { fetchConsolidatedData } from 'api/siteScannerScanReports';

import { resetReportAppInfo } from '../slices/appSlice';
import {
  getScanLogs,
  resetReportOverviewMetaData,
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
  ALLISSUES: { name: 'All issues', id: 'ALLISSUES', index: 1 },
  SCANLOGS: { name: 'Scan logs', id: 'SCANLOGS', index: 2 }
};

export default function useScanReport() {
  // Local State
  const [isLoading, setIsLoading] = useState(false);
  const [scanLogsStateData, setScanLogsStateData] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [selected, setSelected] = useState([]);

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
    // dispatch(setCustomData(null));
    // dispatch(setOverviewData({}));
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    const reportIDList = searchParams.get('id');
    dispatch(getScanLogs(reportIDList));
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

  useEffect(() => () => dispatch(resetReportOverviewMetaData()), [dispatch]);
  /*
    Tab Change Handler
  */
  function onTabChange(tab) {
    const reportId = searchParams.get('id');
    setActiveTab(tab.id);
    navigate({
      search: `?id=${reportId}&tab=${tab.id}`
    });
    setActiveTabIndex(tab.index);
  }

  /*
    Scan Logs Filter Applied
  */
  const onFilterApplied = (e) => {
    setSelected(e);
    const scanLogsStateDataCpy = { ...scanLogsData.data };

    if (e.length) {
      const resultant = [];
      e.map((item) => {
        resultant.push(
          ...scanLogsStateDataCpy.logs.filter(
            (log) => item.value === log.cumulativeStatus
          )
        );
      });
      scanLogsStateDataCpy.logs = resultant;
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
    reportMetaData,
    selected
  };
}
