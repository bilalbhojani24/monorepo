import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11ySlideoverBody, O11yTabs } from 'common/bifrostProxy';

import { TABS } from '../constants';
import { setSHTestDetailsActiveTab } from '../slices/dataSlice';
import { getTestDetailsActiveTab } from '../slices/selectors';

import RunsTab from './RunsTab';

const tabsList = Object.keys(TABS).map((key) => ({
  name: TABS[key],
  value: key
}));

const SlideOverBody = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(getTestDetailsActiveTab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab.value]);

  const onTabChange = (tabInfo) => {
    const activeIndex = Object.keys(TABS).findIndex(
      (item) => item === tabInfo.value
    );
    dispatch(
      setSHTestDetailsActiveTab({
        idx: activeIndex,
        value: tabInfo.name
      })
    );
  };

  return (
    <O11ySlideoverBody wrapperClassName="py-0 px-6 flex flex-col">
      <O11yTabs
        defaultIndex={activeTab.idx}
        tabsArray={tabsList}
        onTabChange={onTabChange}
      />
      <div className="flex flex-1 flex-col pt-6">
        {activeTab.value === TABS.platforms && <span>Platforms component</span>}
        {activeTab.value === TABS.runs && <RunsTab />}
      </div>
    </O11ySlideoverBody>
  );
};

export default SlideOverBody;
