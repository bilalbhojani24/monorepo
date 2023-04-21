import React from 'react';
import { O11yTabs } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { TEST_DETAILS_TABS } from '../constants';

import TestRetriesMenu from './TestRetriesMenu';

const tabsList = Object.keys(TEST_DETAILS_TABS).map((key) => ({
  name: TEST_DETAILS_TABS[key],
  value: key
}));

const TestDetailsHeader = ({ activeTab, onTabChange }) => (
  <div className="mb-4 flex items-center justify-between px-6">
    <O11yTabs
      defaultIndex={activeTab.idx}
      tabsArray={tabsList}
      onTabChange={onTabChange}
      shape="pill"
      disableFullWidthBorder
    />
    {activeTab.value === TEST_DETAILS_TABS.logs && <TestRetriesMenu />}
  </div>
);

TestDetailsHeader.propTypes = {
  activeTab: PropTypes.shape({
    idx: PropTypes.number,
    value: PropTypes.string
  }).isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default TestDetailsHeader;
