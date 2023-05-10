import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yTabs } from 'common/bifrostProxy';
import { hideIntegrationsWidget } from 'features/IntegrationsWidget/utils';

import { useLogsContext } from '../contexts/LogsContext';
import { getTestDetails } from '../slices/selectors';

import { LOGS_INFO_TAB_KEYS } from './DebugTab';
import ReportBugTrigger from './ReportBugTrigger';
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
  const dispatch = useDispatch();
  const details = useSelector(getTestDetails);
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

  useEffect(
    () => () => {
      dispatch(hideIntegrationsWidget());
    },
    [dispatch]
  );

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
          <ReportBugTrigger />
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
