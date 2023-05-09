import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import { fetchBuildData } from 'api/fetchTestAutomationData';
import { updateUrlWithQueryParam } from 'utils/helper';

import { setActiveTab } from './slices/appSlice';
import { setBuildData, setCustomData } from './slices/dataSlice';
import { getActiveTab, getBuildData } from './slices/selector';

export default function useAutomatedTestBuild() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector(getActiveTab);
  const buildData = useSelector(getBuildData);

  const onTabChange = (option) => {
    dispatch(setActiveTab(option.value));
    const updatedPath = updateUrlWithQueryParam({
      activeTab: option.value
    });
    navigate(`?${updatedPath}`);
  };

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
