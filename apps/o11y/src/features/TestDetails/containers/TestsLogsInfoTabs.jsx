import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineBugReport } from '@browserstack/bifrost';
import { O11yButton, O11yTabs } from 'common/bifrostProxy';
import {
  hideIntegrationsWidget,
  showIntegrationsWidget
} from 'features/IntegrationsWidget/utils';
import { AppContext } from 'features/Layout/context/AppContext';

import SessionTestToggle from '../components/SessionTestToggle';
import { useLogsContext } from '../contexts/LogsContext';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getShowTestDetailsFor, getTestDetails } from '../slices/selectors';

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
  const { setWidgetPositionRef } = useContext(AppContext);

  const dispatch = useDispatch();
  const details = useSelector(getTestDetails);
  const testRunId = useSelector(getShowTestDetailsFor);
  const { handleLogTDInteractionEvent, panelRef } =
    useTestDetailsContentContext();
  const [isLoadingBugDetails, setIsLoadingBugDetails] = useState(false);
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

  const handleReportBugClick = async () => {
    handleLogTDInteractionEvent({
      interaction: 'report_bug_clicked'
    });
    setIsLoadingBugDetails(true);
    if (panelRef.current) {
      setWidgetPositionRef(panelRef.current);
    }
    dispatch(showIntegrationsWidget({ testRunId, widgetPosition: 'left' }))
      .then(() => {
        setIsLoadingBugDetails(true);
      })
      .finally(() => {
        setIsLoadingBugDetails(false);
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
          <SessionTestToggle />
          <O11yButton
            isIconOnlyButton
            icon={<MdOutlineBugReport className="h-full w-full" />}
            colors="white"
            onClick={handleReportBugClick}
            loading={isLoadingBugDetails}
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
