import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCustomData from 'api/fetchCustomData';
import { fetchBuildData } from 'api/fetchTestAutomationData';

import { setBuildData, setCustomData } from './slices/dataSlice';
import { getBuildData } from './slices/selector';

export default function useAutomatedTestBuild() {
  const [activeTab, setActiveTab] = useState('overview');
  const dispatch = useDispatch();
  const buildData = useSelector(getBuildData);

  const onTabChange = (option) => {
    setActiveTab(option.value);
  };
  // const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    fetchBuildData();
    Promise.all([fetchCustomData(), fetchBuildData()]).then(
      ([customData, response]) => {
        dispatch(setCustomData(customData.data));
        dispatch(setBuildData(response));
      }
    );
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
    buildData,
    eventName,
    issueSummary,
    onRowClick,
    onTabChange
  };
}
