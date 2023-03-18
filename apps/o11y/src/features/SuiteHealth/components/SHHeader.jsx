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
  <div className={twClassNames('')}>
    <h1 className={twClassNames('px-8 pt-7 text-2xl font-bold leading-7 mb-2')}>
      Suite Health
    </h1>
    <div className="border-base-200 border-b px-8">
      <O11yTabs
        defaultIndex={activeTab.idx}
        tabsArray={tabsList}
        onTabChange={onTabChange}
      />
    </div>
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
