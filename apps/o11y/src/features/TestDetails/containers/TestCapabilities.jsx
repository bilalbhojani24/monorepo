import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yTabs } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import isEmpty from 'lodash/isEmpty';

import TestCapabilitiesList from '../components/TestCapabilitiesList';
import { getCapabilitiesData } from '../slices/dataSlice';
import { getCurrentTestRunId } from '../slices/selectors';

const TAB_KEYS = {
  inputCapabilities: 'inputCapabilities',
  outputCapabilities: 'outputCapabilities',
  app: 'app',
  superUserData: 'superUserData'
};

const TABS = {
  inputCapabilities: {
    name: 'Input',
    value: 'inputCapabilities'
  },
  outputCapabilities: {
    name: 'Device',
    value: 'outputCapabilities'
  },
  app: {
    name: 'App',
    value: 'app'
  },
  superUserData: {
    name: 'Super User Data',
    value: 'superUserData'
  }
};

const TestCapabilities = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const [isLoading, setIsLoading] = useState(true);
  const [capabilities, setCapabilities] = useState({});
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState({
    idx: 0,
    value: TAB_KEYS.inputCapabilities
  });

  const getTabsList = useCallback((data) => {
    const currentTabList = [];
    if (!isEmpty(data.app)) {
      currentTabList.push(TABS.app);
    }
    if (!isEmpty(data.inputCapabilities)) {
      currentTabList.push(TABS.inputCapabilities);
    }
    if (!isEmpty(data.outputCapabilities)) {
      currentTabList.push(TABS.outputCapabilities);
    }
    if (!isEmpty(data.superUserData)) {
      currentTabList.push(TABS.superUserData);
    }
    return currentTabList;
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (currentTestRunId) {
      setIsLoading(true);
      dispatch(getCapabilitiesData({ testRunId: currentTestRunId }))
        .unwrap()
        .then((data) => {
          if (mounted.current) {
            setCapabilities(data);
            setIsLoading(false);
            const currentTabList = getTabsList(data);
            setTabs(currentTabList);
            if (!isEmpty(currentTabList)) {
              setActiveTab({
                idx: 0,
                value: currentTabList[0].value,
                name: currentTabList[0].name
              });
            }
          }
        })
        .catch(() => {
          if (mounted.current) {
            setIsLoading(false);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, currentTestRunId, getTabsList]);

  const onTabChange = (tabInfo) => {
    let activeIndex = tabs.findIndex((item) => item.value === tabInfo.value);
    activeIndex = activeIndex === -1 ? 0 : activeIndex;

    setActiveTab({
      idx: activeIndex,
      value: tabInfo.value,
      name: tabInfo.name
    });
  };

  if (isLoading) {
    return <O11yLoader wrapperClassName="py-6" />;
  }

  if (
    !isLoading &&
    isEmpty(capabilities?.inputCapabilities) &&
    isEmpty(capabilities?.outputCapabilities) &&
    isEmpty(capabilities?.superUserData) &&
    isEmpty(capabilities?.app)
  ) {
    return (
      <div className="h-full w-full">
        <EmptyPage text="No data found" />
      </div>
    );
  }

  return (
    <div className="bg-base-50 rounded-md p-6">
      <O11yTabs
        defaultIndex={activeTab.idx}
        tabsArray={tabs}
        onTabChange={onTabChange}
      />
      <TestCapabilitiesList data={capabilities[activeTab.value]} />
    </div>
  );
};

TestCapabilities.propTypes = {};

export default TestCapabilities;
