import React from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineBugReport } from '@browserstack/bifrost';
import { O11yButton, O11yTabs } from 'common/bifrostProxy';

import SessionTestToggle from '../components/SessionTestToggle';
import { useLogsContext } from '../contexts/LogsContext';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getTestDetails } from '../slices/selectors';

import { LOGS_INFO_TAB_KEYS } from './DebugTab';
import TestConsolidatedLogs from './TestConsolidatedLogs';
import TestNetworkLogs from './TestNetworkLogs';

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
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  const { videoSeekTime, sessionTestToggle, activeTab, setActiveTab } =
    useLogsContext();

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
      <div className="border-base-200 sticky top-0 z-20 flex items-center border-b bg-white">
        <O11yTabs
          defaultIndex={activeTab.idx}
          tabsArray={tabs}
          onTabChange={onTabChange}
          disableFullWidthBorder
          wrapperClassName="flex-1"
        />
        <div className="flex items-center gap-3 pr-1">
          <SessionTestToggle />
          <O11yButton
            isIconOnlyButton
            icon={<MdOutlineBugReport className="h-full w-full" />}
            colors="white"
            onClick={() => {
              handleLogTDInteractionEvent({
                interaction: 'report_bug_clicked'
              });
            }}
          />
        </div>
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
