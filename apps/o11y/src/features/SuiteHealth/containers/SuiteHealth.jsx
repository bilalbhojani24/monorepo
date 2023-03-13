import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import EmptyPage from 'common/EmptyPage';
import { SNP_PARAMS_MAPPING, WRAPPER_GAP_CLASS } from 'constants/common';
import SHErrorDetailsSlideOver from 'features/SHErrorDetails';
import { getIsSnPErrorDetailsVisible } from 'features/SHErrorDetails/slices/selectors';
import SHTestDetailsSlideOver from 'features/SHTestDetails';
import { setIsSnPDetailsVisible } from 'features/SHTestDetails/slices/dataSlice';
import TestDetailsSlideOver from 'features/TestDetails';
import { getIsDetailsVisible } from 'features/TestDetails/slices/selectors';
import { setIsDetailsVisible } from 'features/TestDetails/slices/uiSlice';

import { TABS } from '../constants';
import { clearSnPTests, setActiveTab } from '../slices/dataSlice';
import { getSnPActiveTab } from '../slices/selectors';

import SHHeader from './SHHeader';
import SHTests from './SHTests';
import SHUniqueErrors from './SHUniqueErrors';

export default function SnP() {
  const dispatch = useDispatch();
  const isSnPErrorDetailsVisible = useSelector(getIsSnPErrorDetailsVisible);
  const isDetailsVisible = useSelector(getIsDetailsVisible);
  const activeTab = useSelector(getSnPActiveTab);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      dispatch(setIsSnPDetailsVisible(false));
      dispatch(setIsDetailsVisible(false));
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
          value: Object.values(TABS)[activeIndex]
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
      <div className={twClassNames('px-8 py-7 flex-1 overflow-auto')}>
        {activeTab.value === TABS.tests && <SHTests />}
        {activeTab.value === TABS.unique_errors && <SHUniqueErrors />}
        {activeTab.value === TABS.build_performance && (
          <div
            className={twClassNames('flex items-center justify-center h-full')}
          >
            <EmptyPage text="Something awesome is coming soon" isUpcoming />
          </div>
        )}
        <SHTestDetailsSlideOver />
        {isSnPErrorDetailsVisible && (
          <SHErrorDetailsSlideOver isVisible={isSnPErrorDetailsVisible} />
        )}
        {isDetailsVisible && (
          <TestDetailsSlideOver isVisible={isSnPErrorDetailsVisible} />
        )}
      </div>
    </div>
  );
}
