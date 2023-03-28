import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11yTabs } from 'common/bifrostProxy';
import StatusIcon from 'common/StatusIcon';
import isEmpty from 'lodash/isEmpty';

import { getShowTestDetailsFor, getTestMeta } from '../slices/selectors';
import { setShowTestDetailsFor } from '../slices/uiSlice';

const HistorySlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testMeta = useSelector(getTestMeta);
  const testRunId = useSelector(getShowTestDetailsFor);

  const [activeTab, setActiveTab] = useState({
    idx: 0,
    value: null,
    name: null
  });

  const tabs = useMemo(() => {
    if (!isEmpty(testMeta.data?.history)) {
      return testMeta.data?.history.map((testHistory) => ({
        name: testHistory.serialId,
        value: testHistory.testRunId,
        icon: () => (
          <div className="mr-2 flex h-full items-center">
            <StatusIcon
              status={testHistory?.status}
              {...(activeTab.value === testHistory.testRunId
                ? {}
                : { noColor: true })}
            />
          </div>
        )
      }));
    }
    return [];
  }, [activeTab.value, testMeta.data?.history]);

  useEffect(() => {
    const allTestHistory = testMeta.data?.history;
    if (!isEmpty(allTestHistory)) {
      const activeTestHistoryIdx = allTestHistory.findIndex(
        (testHistory) => testHistory.testRunId === testRunId
      );

      if (activeTestHistoryIdx !== -1) {
        const activeTestHistory = allTestHistory[activeTestHistoryIdx];
        setActiveTab({
          idx: activeTestHistoryIdx,
          value: activeTestHistory.testRunId,
          name: activeTestHistory.serialId
        });
      }
    }
  }, [testMeta.data?.history, testRunId]);

  const onTabChange = useCallback(
    (tabInfo) => {
      let activeIndex = tabs.findIndex((item) => item.value === tabInfo.value);
      activeIndex = activeIndex === -1 ? 0 : activeIndex;

      setActiveTab({
        idx: activeIndex,
        value: tabInfo.value,
        name: tabInfo.name
      });
      dispatch(setShowTestDetailsFor(tabInfo.value));
      const searchParams = new URLSearchParams(window?.location?.search);
      searchParams.set('details', tabInfo.value);
      navigate({ search: searchParams.toString() });
    },
    [dispatch, navigate, tabs]
  );

  return (
    <div className="mb-4 px-6">
      <O11yTabs
        defaultIndex={activeTab.idx}
        tabsArray={tabs}
        onTabChange={onTabChange}
      />
    </div>
  );
};

HistorySlider.propTypes = {};

export default HistorySlider;
