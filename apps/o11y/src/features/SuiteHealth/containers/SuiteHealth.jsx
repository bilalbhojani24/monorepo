import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import EmptyPage from 'common/EmptyPage';
import {
  SNP_PARAMS_MAPPING,
  TEST_DETAILS_SOURCE,
  WRAPPER_GAP_CLASS
} from 'constants/common';
import SHErrorDetailsSlideOver from 'features/SHErrorDetails';
import { getIsUEDetailsVisible } from 'features/SHErrorDetails/slices/selectors';
import SHTestDetailsSlideOver from 'features/SHTestDetails';
import { setIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/dataSlice';
import { getIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/selectors';
import TestDetailsSlideOver from 'features/TestDetails';
import { getIsTestDetailsVisible } from 'features/TestDetails/slices/selectors';
import { setIsTestDetailsVisible } from 'features/TestDetails/slices/uiSlice';

import SHHeader from '../components/SHHeader';
import { TABS } from '../constants';
import { clearSnPTests } from '../slices/dataSlice';
import { getSnPActiveTab } from '../slices/selectors';
import { setActiveTab } from '../slices/uiSlice';

import SHTests from './SHTests';
import SHUniqueErrors from './SHUniqueErrors';

export default function SnP() {
  const dispatch = useDispatch();
  const isSnPErrorDetailsVisible = useSelector(getIsUEDetailsVisible);
  const isDetailsVisible = useSelector(getIsTestDetailsVisible);
  const isSnPDetailsVisible = useSelector(getIsSHTestsDetailsVisible);
  const activeTab = useSelector(getSnPActiveTab);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      dispatch(setIsSHTestsDetailsVisible(false));
      dispatch(setIsTestDetailsVisible(false));
      dispatch(clearSnPTests());
    },
    [dispatch]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab.value]);

  const removeCommonParams = useCallback(() => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.delete('details');
    searchParams.delete(SNP_PARAMS_MAPPING.snpTestDetails);
    searchParams.delete(SNP_PARAMS_MAPPING.snpOsName);
    searchParams.delete(SNP_PARAMS_MAPPING.snpBrowserName);
    searchParams.delete(SNP_PARAMS_MAPPING.snpOsVersion);
    searchParams.delete(SNP_PARAMS_MAPPING.snpBrowserVersion);
    searchParams.delete(SNP_PARAMS_MAPPING.snpErrorId);
    searchParams.delete(SNP_PARAMS_MAPPING.snpErrorTestId);
    return searchParams;
  }, []);

  const onTabChange = useCallback(
    (tabInfo) => {
      const searchParams = removeCommonParams();
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
    [dispatch, navigate, removeCommonParams]
  );
  return (
    <div
      className={twClassNames(
        'flex flex-col overflow-hidden',
        WRAPPER_GAP_CLASS
      )}
    >
      <SHHeader activeTab={activeTab} onTabChange={onTabChange} />
      <div className={twClassNames('flex-1')}>
        {activeTab.value === TABS.tests && <SHTests />}
        {activeTab.value === TABS.unique_errors && <SHUniqueErrors />}
        {activeTab.value === TABS.build_performance && (
          <div
            className={twClassNames('flex items-center justify-center h-full')}
          >
            <EmptyPage text="Something awesome is coming soon" isUpcoming />
          </div>
        )}
        {isSnPDetailsVisible && <SHTestDetailsSlideOver />}
        {isSnPErrorDetailsVisible && <SHErrorDetailsSlideOver />}
        {isDetailsVisible && (
          <TestDetailsSlideOver
            source={TEST_DETAILS_SOURCE.SUITE_HEALTH_TESTS}
          />
        )}
      </div>
    </div>
  );
}
