import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchCustomData from 'api/fetchCustomData';
import { fetchTestCaseData } from 'api/fetchTestAutomationData';
import { deleteUrlQueryParam, updateUrlWithQueryParam } from 'utils/helper';

import {
  resetActiveTab,
  resetFilters,
  resetIssueItem,
  resetReportAppInfo,
  setActiveTab
} from './slices/appSlice';
import {
  resetInitialState,
  setCustomData,
  setTestData
} from './slices/dataSlice';
import { getActiveTab, getTestData, getTestMetaData } from './slices/selector';

export default function useAutomatedTestBuild({ onSliderClose, testID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCopying, setIsCopying] = useState(false);
  const activeTab = useSelector(getActiveTab);
  const testData = useSelector(getTestData);
  const testMetaData = useSelector(getTestMetaData);

  const onTabChange = (option) => {
    const tab = option.value;
    dispatch(setActiveTab(tab));
    const updatedPath = updateUrlWithQueryParam({
      activeSlideOverTab: tab
    });
    navigate(`?${updatedPath}`);
  };

  const onClosingSlider = () => {
    onSliderClose();
    const updatedPath = deleteUrlQueryParam(['activeTestId']);
    navigate(`?${updatedPath}`);
  };

  const onShareLinkClick = () => {
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  };

  useEffect(
    () => () => {
      dispatch(resetInitialState());
      dispatch(resetFilters());
      dispatch(resetReportAppInfo());
      dispatch(resetIssueItem());
      dispatch(resetActiveTab());
    },
    []
  );

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
    isCopying,
    onClosingSlider,
    onRowClick,
    onTabChange,
    onShareLinkClick
  };
}
