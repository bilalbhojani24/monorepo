import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { SNP_PARAMS_MAPPING, TEST_DETAILS_SOURCE } from 'constants/common';
import SHErrorDetailsSlideOver from 'features/SHErrorDetails';
import { getIsUEDetailsVisible } from 'features/SHErrorDetails/slices/selectors';
import SHTestDetailsSlideOver from 'features/SHTestDetails';
import { setIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/dataSlice';
import { getIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/selectors';
import TestDetails from 'features/TestDetails';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';

import SHHeader from '../components/SHHeader';
import { TABS } from '../constants';
import { clearSnPTests, setActiveTab } from '../slices/dataSlice';
import { getSnPActiveTab } from '../slices/selectors';

import SHTests from './SHTests';
import SHUniqueErrors from './SHUniqueErrors';

export default function SnP() {
  const dispatch = useDispatch();
  const isSnPErrorDetailsVisible = useSelector(getIsUEDetailsVisible);
  const isSnPDetailsVisible = useSelector(getIsSHTestsDetailsVisible);
  const activeTab = useSelector(getSnPActiveTab);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      dispatch(setIsSHTestsDetailsVisible(false));
      dispatch(clearSnPTests());
      dispatch(hideTestDetailsDrawer());
    },
    [dispatch]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab.value]);

  const onTabChange = useCallback(
    (tabInfo) => {
      dispatch(hideTestDetailsDrawer());
      const searchParams = new URLSearchParams(window.location.search);
      let activeIndex = Object.keys(TABS).findIndex(
        (item) => item === tabInfo.value
      );
      activeIndex = activeIndex === -1 ? 0 : activeIndex;
      searchParams.set(
        SNP_PARAMS_MAPPING.snpTab,
        Object.keys(TABS)[activeIndex]
      );
      navigate({ search: searchParams.toString() });
      dispatch(
        setActiveTab({
          idx: activeIndex,
          value: tabInfo.name
        })
      );
    },
    [dispatch, navigate]
  );
  return (
    <>
      <SHHeader activeTab={activeTab} onTabChange={onTabChange} />
      <div className={twClassNames('flex-1')}>
        {activeTab.value === TABS.tests && <SHTests />}
        {activeTab.value === TABS.unique_errors && <SHUniqueErrors />}
        {isSnPDetailsVisible && <SHTestDetailsSlideOver />}
        {isSnPErrorDetailsVisible && <SHErrorDetailsSlideOver />}
        <TestDetails
          source={
            activeTab.value === TABS.tests
              ? TEST_DETAILS_SOURCE.SUITE_HEALTH_TESTS
              : TEST_DETAILS_SOURCE.SUITE_HEALTH_ERRORS
          }
        />
      </div>
    </>
  );
}
