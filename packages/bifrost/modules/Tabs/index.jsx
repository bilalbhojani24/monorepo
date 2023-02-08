import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Tab from './components/Tab';
import { TAB_SHAPE } from './const/tabsConstants';

import './styles.scss';

const Tabs = ({
  defaultIndex,
  id,
  isContained,
  isFullWidth,
  label,
  onTabChange,
  shape,
  tabsArray
}) => {
  const [selectedTab, setSelectedTab] = useState(
    tabsArray ? tabsArray[0] : null
  );

  const onTabClickHandler = (event, clickedTab) => {
    const thisTab =
      clickedTab ||
      tabsArray.find((tab) => tab.name === event.currentTarget.value);
    setSelectedTab(thisTab);
    onTabChange(thisTab, event);
  };

  useEffect(() => {
    if (defaultIndex && tabsArray?.length && tabsArray[defaultIndex])
      setSelectedTab(tabsArray[defaultIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultIndex]);

  return (
    <>
      {tabsArray?.length && (
        <div className="w-full">
          <div className="sm:hidden">
            {label && (
              <label htmlFor={id} className="sr-only">
                {label}
              </label>
            )}
            <select
              id={id}
              name={id}
              onChange={onTabClickHandler}
              className="border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
              defaultValue={selectedTab?.name}
            >
              {tabsArray?.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-base-200 border-b">
              <nav
                className={classNames('-mb-px flex', {
                  'space-x-8': !isFullWidth,
                  'border-b': isFullWidth,
                  'isolate flex divide-x divide-base-200 rounded-lg shadow space-x-0':
                    isContained
                })}
                aria-label="Tabs"
              >
                {tabsArray?.map((tab, index) => (
                  <Tab
                    tab={tab}
                    key={tab.name}
                    isCurrent={selectedTab?.name === tab.name}
                    onTabClick={onTabClickHandler}
                    shape={shape}
                    isContained={isContained}
                    isFullWidth={isFullWidth}
                    totalTabs={tabsArray.length}
                    tabIdx={index}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Tabs.propTypes = {
  defaultIndex: PropTypes.number,
  id: PropTypes.string,
  isContained: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  label: PropTypes.string,
  onTabChange: PropTypes.func,
  shape: PropTypes.string,
  tabsArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
      count: PropTypes.string
    })
  ).isRequired
};

Tabs.defaultProps = {
  defaultIndex: 0,
  id: '',
  isContained: false,
  isFullWidth: false,
  label: '',
  onTabChange: () => {},
  shape: TAB_SHAPE[0]
};

export default Tabs;
