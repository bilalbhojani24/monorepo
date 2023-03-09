import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yTabs } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { TABS } from '../constants';

const tabsList = Object.keys(TABS).map((key) => ({
  name: TABS[key],
  value: key
}));

const SHHeader = ({ activeTab, onTabChange }) => (
  <div className={twClassNames('sticky bg-white top-16 z-10')}>
    <h1 className={twClassNames('px-8 pt-7 text-2xl font-bold leading-7 mb-2')}>
      Suite Health
    </h1>
    {/* TODO => Tabs horizontal padding  */}
    <O11yTabs
      defaultIndex={activeTab.idx}
      tabsArray={tabsList}
      onTabChange={onTabChange}
    />
  </div>
);

SHHeader.propTypes = {
  activeTab: PropTypes.shape({
    idx: PropTypes.number,
    value: PropTypes.string
  }).isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default SHHeader;
