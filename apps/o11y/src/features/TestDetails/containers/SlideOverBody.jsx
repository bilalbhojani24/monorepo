import React, { useCallback, useEffect, useRef, useState } from 'react';
import { O11ySlideoverBody } from 'common/bifrostProxy';

import {
  TEST_DETAILS_SLIDEOVER_ELEMENT_ID,
  TEST_DETAILS_TABS
} from '../constants';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

import DebugTab from './DebugTab';
import HistorySlider from './HistorySlider';
import InfoTab from './InfoTab';
import TestDetailsHeader from './TestDetailsHeader';

const SlideOverBody = () => {
  const { panelRef } = useTestDetailsContentContext();
  const [activeTab, setActiveTab] = useState({
    idx: 0,
    value: TEST_DETAILS_TABS.logs
  });
  const scrollParentRef = useRef(null);

  useEffect(() => {
    if (scrollParentRef.current) {
      scrollParentRef.current.scrollTo(0, 0);
    }
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
    <O11ySlideoverBody wrapperClassName="overflow-hidden pt-0">
      <div
        className="flex h-full w-full flex-col"
        id={TEST_DETAILS_SLIDEOVER_ELEMENT_ID}
        ref={panelRef}
      >
        <HistorySlider />
        <TestDetailsHeader activeTab={activeTab} onTabChange={onTabChange} />
        <div className="flex-1 overflow-hidden px-6" ref={scrollParentRef}>
          {activeTab.value === TEST_DETAILS_TABS.logs && <DebugTab />}
          {activeTab.value === TEST_DETAILS_TABS.info && <InfoTab />}
        </div>
      </div>
    </O11ySlideoverBody>
  );
};
export default SlideOverBody;
