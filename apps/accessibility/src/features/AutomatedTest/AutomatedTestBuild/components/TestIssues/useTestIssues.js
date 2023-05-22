import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import { fetchTestCaseData } from 'api/fetchTestAutomationData';
import { updateUrlWithQueryParam } from 'utils/helper';

import {
  resetActiveTab,
  resetFilters,
  resetIssueItem,
  resetReportAppInfo,
  setActiveTab
} from './slices/appSlice';
import { setCustomData, setTestData } from './slices/dataSlice';
import { getActiveTab, getTestData, getTestMetaData } from './slices/selector';

export default function useAutomatedTestBuild({ onSliderClose, testID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const onClosingSlider = () => {
    dispatch(resetFilters());
    dispatch(resetReportAppInfo());
    dispatch(resetIssueItem());
    dispatch(resetActiveTab());

    onSliderClose();
  };

  useEffect(() => {
    Promise.all([fetchCustomData(), fetchTestCaseData(testID)]).then(
      ([customData, tabData]) => {
        dispatch(setCustomData(customData.data));
        dispatch(setTestData(tabData));
      }
    );
  }, [testID]);

  const actionType = '';
  const eventName = 'Sample event name...';
  const onRowClick = () => {};
  return {
    activeTab,
    actionType,
    testMetaData,
    testData,
    eventName,
    onClosingSlider,
    onRowClick,
    onTabChange
  };
}
