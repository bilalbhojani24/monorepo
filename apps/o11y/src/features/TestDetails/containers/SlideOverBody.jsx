import React, { useCallback, useEffect, useState } from 'react';
import { O11ySlideoverBody } from 'common/bifrostProxy';

import { TEST_DETAILS_TABS } from '../constants';

import HistorySlider from './HistorySlider';
import InfoTab from './InfoTab';
import LogsTab from './LogsTab';
import TestDetailsHeader from './TestDetailsHeader';

const SlideOverBody = () => {
  const [activeTab, setActiveTab] = useState({
    idx: 0,
    value: TEST_DETAILS_TABS.logs
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab.value]);

  const onTabChange = useCallback((tabInfo) => {
    let activeIndex = Object.keys(TEST_DETAILS_TABS).findIndex(
      (item) => item === tabInfo.value
    );
    activeIndex = activeIndex === -1 ? 0 : activeIndex;

    setActiveTab({
      idx: activeIndex,
      value: tabInfo.name
    });
  }, []);

  return (
    <O11ySlideoverBody wrapperClassName="flex flex-col overflow-hidden pt-0">
      <HistorySlider />
      <TestDetailsHeader activeTab={activeTab} onTabChange={onTabChange} />
      <div className="overflow-auto px-6">
        {activeTab.value === TEST_DETAILS_TABS.logs && <LogsTab />}
        {activeTab.value === TEST_DETAILS_TABS.info && <InfoTab />}
      </div>
    </O11ySlideoverBody>
  );
};
export default SlideOverBody;
