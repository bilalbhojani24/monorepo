import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import fetchReport from 'api/fetchReport';
import { events, ISSUE_TYPE } from 'constants';
import {
  setActiveSwitch,
  setActiveTab,
  setOpenAccordionId
} from 'features/Report/slice/appSlice';
import { setCustomData, setReportData } from 'features/Report/slice/dataSlice';
import {
  getActiveTab,
  getDefaultIndex,
  getReportMetaData
} from 'features/Report/slice/selector';
import { updateUrlWithQueryParam } from 'utils/helper';
// import { logEvent } from 'utils/logEvent';

export default function useReport() {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultIndex = useSelector(getDefaultIndex);
  const reportMetaData = useSelector(getReportMetaData);
  const activeTab = useSelector(getActiveTab);
  const params = new URLSearchParams(window.location.search);

  const onTabChange = (tab) => {
    dispatch(setActiveTab(tab.value));
    dispatch(setActiveSwitch(ISSUE_TYPE));
    dispatch(setOpenAccordionId(''));
    // logEvent('OnADReportView', {
    //   actionType: events.CHOOSE_TAB,
    //   tab: tab.value
    // });
    const path = updateUrlWithQueryParam({ activeTab: tab.value });
    navigate(`?${path}`);
  };

  const onCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const reportIDList = params.get('ids').split(',');
    const isConsolidated = reportIDList.length > 1;
    setIsLoading(true);
    Promise.all([
      fetchCustomData(),
      fetchReport(reportIDList, window.dashboardUserID)
    ]).then(([customData, reportData]) => {
      dispatch(setCustomData(customData.data));
      dispatch(setReportData(reportData));
      const dataObject = {
        reportType: isConsolidated ? 'Consolidated' : 'Individual',
        issueCount: reportData.issueSummary.issueCount,
        pageCount: reportData.issueSummary.pageCount,
        componentCount: reportData.issueSummary.componentCount
      };
      if (isConsolidated) {
        dataObject.reportCount = reportIDList.length;
      }
      // logEvent('OnADReportView', dataObject);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return {
    activeTab,
    defaultIndex,
    isCopied,
    isLoading,
    reportMetaData,
    onCopyClick,
    onTabChange
  };
}
