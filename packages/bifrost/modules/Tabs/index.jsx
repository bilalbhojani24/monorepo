import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import SelectMenu from '../SelectMenu';
import SelectMenuOptionGroup from '../SelectMenuOptionGroup';
import SelectMenuOptionItem from '../SelectMenuOptionItem';
import SelectMenuTrigger from '../SelectMenuTrigger';

import Tab from './components/Tab';
import { TAB_SHAPE } from './const/tabsConstants';

const Tabs = ({
  defaultIndex,
  id,
  isContained,
  isFullWidth,
  label,
  onTabChange,
  shape,
  tabsArray,
  disableFullWidthBorder,
  wrapperClassName,
  navigationClassName
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
    if (tabsArray?.length && tabsArray[defaultIndex])
      setSelectedTab(tabsArray[defaultIndex]);
  }, [defaultIndex, tabsArray]);

  return (
    <>
      {tabsArray?.length && (
        <div className={twClassNames('w-full', wrapperClassName)}>
          <div className={twClassNames('sm:hidden', navigationClassName)}>
            {label && (
              <label htmlFor={id} className="sr-only">
                {label}
              </label>
            )}
            <SelectMenu onChange={onTabChange}>
              <SelectMenuTrigger placeholder="Select.." />
              <SelectMenuOptionGroup>
                {tabsArray.map((item) => (
                  <SelectMenuOptionItem
                    key={item.name}
                    option={{
                      value: item.name,
                      label: item.name
                    }}
                  />
                ))}
              </SelectMenuOptionGroup>
            </SelectMenu>
          </div>
          <div
            className={twClassNames(
              {
                'border-base-200 border-b': !disableFullWidthBorder
              },
              'hidden sm:block'
            )}
          >
            <nav
              className={twClassNames(
                '-mb-px flex overflow-y-scroll scrollbar-hide',
                {
                  'space-x-8': !isFullWidth,
                  'border-0': isFullWidth,
                  'isolate flex divide-x divide-base-200 rounded-lg shadow space-x-0':
                    isContained
                },
                navigationClassName
              )}
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
  ).isRequired,
  disableFullWidthBorder: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  navigationClassName: PropTypes.string
};

Tabs.defaultProps = {
  defaultIndex: 0,
  id: '',
  isContained: false,
  isFullWidth: false,
  label: '',
  onTabChange: () => {},
  shape: TAB_SHAPE[0],
  disableFullWidthBorder: false,
  wrapperClassName: '',
  navigationClassName: ''
};

export default Tabs;
