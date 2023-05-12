import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import {
  fetchBuildIssues,
  fetchBuildMetaData,
  fetchOverview,
  fetchTestCases
} from 'api/fetchTestAutomationData';
import { ISSUES, SUMMARY, TESTS } from 'constants';
import { updateUrlWithQueryParam } from 'utils/helper';

import { setActiveTab } from './slices/appSlice';
import {
  setBuildData,
  setBuildMetaData,
  setBuildOverview,
  setCustomData
} from './slices/dataSlice';
import {
  getActiveTab,
  getBuildData,
  getBuildMetaData
} from './slices/selector';

export default function useAutomatedTestBuild() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector(getActiveTab);
  const buildData = useSelector(getBuildData);
  const buildMetaData = useSelector(getBuildMetaData);
  const [testRuns, setTestRuns] = useState([]);

  const onTabChange = (option) => {
    const tab = option.value;
    if (tab === SUMMARY && !buildMetaData.issueSummary) {
      fetchOverview().then((response) => dispatch(setBuildOverview(response)));
    } else if (tab === ISSUES && !buildData) {
      fetchBuildIssues().then((response) => dispatch(setBuildData(response)));
    }
    dispatch(setActiveTab(tab));
    const updatedPath = updateUrlWithQueryParam({
      activeTab: tab
    });
    navigate(`?${updatedPath}`);
  };

  useEffect(() => {
    const fetchData = (() => {
      switch (activeTab) {
        case SUMMARY:
          return fetchOverview;
        case ISSUES:
          return fetchBuildIssues;
        default:
          return fetchOverview;
      }
    })();
    Promise.all([fetchCustomData(), fetchBuildMetaData(), fetchData()]).then(
      ([customData, metaData, tabData]) => {
        dispatch(setCustomData(customData.data));
        if (activeTab === SUMMARY) {
          dispatch(setBuildOverview(tabData));
        } else if (activeTab === ISSUES) {
          dispatch(setBuildData(tabData));
        }
        dispatch(setBuildMetaData(metaData));
      }
    );
  }, []);

  useEffect(() => {
    fetchTestCases().then((response) => setTestRuns(response));
  }, []);

  const actionType = '';
  const eventName = 'Sample event name...';
  const issueSummary = {
    critical: 100,
    serious: 200,
    moderate: 300,
    minor: 400,
    issueCount: 1000
  };
  const onRowClick = () => {};
  return {
    activeTab,
    actionType,
    buildMetaData,
    buildData,
    eventName,
    issueSummary,
    onRowClick,
    onTabChange,
    testRuns
  };
}
