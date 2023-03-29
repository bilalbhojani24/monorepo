import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineBugReport } from '@browserstack/bifrost';
import { O11yButton, O11yTabs } from 'common/bifrostProxy';

import { useLogsContext } from '../contexts/LogsContext';
import { getTestDetails } from '../slices/selectors';

// import PropTypes from 'prop-types';
import TestConsolidatedLogs from './TestConsolidatedLogs';
import TestNetworkLogs from './TestNetworkLogs';

const LOGS_INFO_TAB_KEYS = {
  logs: 'logs',
  network: 'network'
};

const tabs = [
  {
    name: 'Logs',
    value: 'logs'
  },
  {
    name: 'Network',
    value: 'network'
  }
];

const TestsLogsInfoTabs = () => {
  const details = useSelector(getTestDetails);
  const { videoSeekTime, sessionTestToggle } = useLogsContext();
  const [activeTab, setActiveTab] = useState({
    idx: 0,
    value: LOGS_INFO_TAB_KEYS.logs
  });

  const onTabChange = (tabInfo) => {
    let activeIndex = tabs.findIndex((item) => item.value === tabInfo.value);
    activeIndex = activeIndex === -1 ? 0 : activeIndex;

    setActiveTab({
      idx: activeIndex,
      value: tabInfo.value
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-base-200 sticky top-0 z-10 flex items-center border-b bg-white">
        <O11yTabs
          defaultIndex={activeTab.idx}
          tabsArray={tabs}
          onTabChange={onTabChange}
          disableFullWidthBorder
          wrapperClassName="flex-1"
        />
        <O11yButton
          isIconOnlyButton
          icon={<MdOutlineBugReport className="h-full w-full" />}
          colors="white"
        />
      </div>
      <div className="flex-1">
        {activeTab.value === LOGS_INFO_TAB_KEYS.logs && (
          <TestConsolidatedLogs
            videoSeekTime={
              sessionTestToggle
                ? videoSeekTime
                : (videoSeekTime === -1 ? 0 : videoSeekTime) +
                  details.data?.videoLogs?.startOffset / 1000
            }
          />
        )}
        {activeTab.value === LOGS_INFO_TAB_KEYS.network && <TestNetworkLogs />}
      </div>
    </div>
  );
};

TestsLogsInfoTabs.propTypes = {};

export default TestsLogsInfoTabs;
