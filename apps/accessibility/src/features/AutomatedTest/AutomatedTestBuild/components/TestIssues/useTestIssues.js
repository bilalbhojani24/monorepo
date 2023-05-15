import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import { fetchTestCaseData } from 'api/fetchTestAutomationData';
import { updateUrlWithQueryParam } from 'utils/helper';

import { setActiveTab } from './slices/appSlice';
import { setCustomData, setTestData } from './slices/dataSlice';
import { getActiveTab, getTestData, getTestMetaData } from './slices/selector';

export default function useAutomatedTestBuild() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const activeTab = useSelector(getActiveTab);
  const testData = useSelector(getTestData);
  const testMetaData = useSelector(getTestMetaData);

  const onTabChange = (option) => {
    const tab = option.value;
    dispatch(setActiveTab(tab));
    const updatedPath = updateUrlWithQueryParam({
      activeTab: tab
    });
    navigate(`?${updatedPath}`);
  };

  useEffect(() => {
    Promise.all([fetchCustomData(), fetchTestCaseData()]).then(
      ([customData, tabData]) => {
        dispatch(setCustomData(customData.data));
        dispatch(setTestData(tabData));
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
    testMetaData,
    testData,
    eventName,
    issueSummary,
    isOpen,
    setIsOpen,
    onRowClick,
    onTabChange
  };
}
