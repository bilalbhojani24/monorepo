import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import {
  fetchBuildIssues,
  fetchBuildMetaData,
  fetchOverview,
  fetchTestCasesData
} from 'api/fetchTestAutomationData';
import { ISSUES, SUMMARY, TESTS } from 'constants';
import { updateUrlWithQueryParam } from 'utils/helper';

import { setActiveTab } from './slices/appSlice';
import {
  setBuildData,
  setBuildMetaData,
  setBuildOverview,
  setCustomData,
  setTestCasesData
} from './slices/dataSlice';
import {
  getActiveTab,
  getBuildData,
  getBuildMetaData,
  getTestCasesData
} from './slices/selector';

export default function useAutomatedTestBuild() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector(getActiveTab);
  const buildData = useSelector(getBuildData);
  const buildMetaData = useSelector(getBuildMetaData);
  const testRuns = useSelector(getTestCasesData);
  const [isCopied, setIsCopied] = useState(false);
  const { buildName, buildNumber, projectName } = useParams();

  const onCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const formateUrl = () => {
    const url = window.location.href;
    return url.split('?')[0];
  };

  const onTabChange = (option) => {
    const tab = option.value;
    if (tab === SUMMARY && !buildMetaData.issueSummary) {
      fetchOverview(projectName, buildName, buildNumber).then((response) =>
        dispatch(setBuildOverview(response))
      );
    } else if (tab === ISSUES && !buildData) {
      fetchBuildIssues(projectName, buildName, buildNumber).then((response) =>
        dispatch(setBuildData(response))
      );
    } else if (tab === TESTS) {
      fetchTestCasesData(projectName, buildName, buildNumber).then((response) =>
        dispatch(setTestCasesData(response))
      );
    }
    dispatch(setActiveTab(tab));
    const updatedPath = updateUrlWithQueryParam({
      activeTab: tab
    });
    navigate(`?${updatedPath}`);
  };

  const fetchTestCasesHelper = () =>
    fetchTestCasesData(projectName, buildName, buildNumber);

  useEffect(() => {
    const fetchData = (() => {
      switch (activeTab) {
        case SUMMARY:
          return fetchOverview;
        case ISSUES:
          return fetchBuildIssues;
        case TESTS:
          return fetchTestCasesHelper;
        default:
          return fetchOverview;
      }
    })();
    Promise.all([
      fetchCustomData(),
      fetchBuildMetaData(projectName, buildName, buildNumber),
      fetchData(projectName, buildName, buildNumber)
    ]).then(([customData, metaData, tabData]) => {
      dispatch(setCustomData(customData.data));
      if (activeTab === SUMMARY) {
        dispatch(setBuildOverview(tabData));
      } else if (activeTab === ISSUES) {
        dispatch(setBuildData(tabData));
      } else if (activeTab === TESTS) {
        dispatch(setTestCasesData(tabData));
      }
      dispatch(setBuildMetaData(metaData));
    });
  }, []);

  const actionType = '';
  const eventName = 'Sample event name...';
  const onRowClick = () => {};
  return {
    activeTab,
    actionType,
    buildMetaData,
    buildData,
    eventName,
    onRowClick,
    onTabChange,
    testRuns,
    isCopied,
    onCopyClick,
    formateUrl
  };
}
