import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import O11yLoader from 'common/O11yLoader';

import InfoSidebar from '../components/InfoSidebar';
import { getTestInfoTabsData } from '../slices/dataSlice';
import { getCurrentTestRunId } from '../slices/selectors';

import TestBehaviour from './TestBehaviour';
import TestCapabilities from './TestCapabilities';
import TestCode from './TestCode';
import TestOverview from './TestOverview';

const TABS_MAPPING = {
  overview: 'overview',
  testCode: 'testCode',
  behaviour: 'behaviour',
  capabilities: 'capabilities'
};
const InfoTab = () => {
  const dispatch = useDispatch();

  const currentTestRunId = useSelector(getCurrentTestRunId);

  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TABS_MAPPING.overview);

  const onTabChange = useCallback((data) => {
    setActiveTab(data.id);
  }, []);

  useEffect(() => {
    if (currentTestRunId) {
      setIsLoading(true);
      dispatch(getTestInfoTabsData({ testRunId: currentTestRunId }))
        .unwrap()
        .then((res) => {
          setTabs(res);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, currentTestRunId]);

  if (isLoading) {
    return <O11yLoader wrapperClassName="py-20" />;
  }

  return (
    <div className="flex pt-4">
      <InfoSidebar tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      <div className="flex-1 pt-2">
        {activeTab === TABS_MAPPING.overview && <TestOverview />}
        {activeTab === TABS_MAPPING.testCode && <TestCode />}
        {activeTab === TABS_MAPPING.behaviour && <TestBehaviour />}
        {activeTab === TABS_MAPPING.capabilities && <TestCapabilities />}
      </div>
    </div>
  );
};

InfoTab.propTypes = {};

export default InfoTab;
