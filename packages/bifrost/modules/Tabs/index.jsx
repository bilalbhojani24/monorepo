import React, { useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

import Button from '../Button';
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
  const containerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(
    tabsArray ? tabsArray[0] : null
  );
  const [isOverflowed, setIsOverflowed] = useState(false);

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

  useEffect(() => {
    const container = containerRef.current;
    setIsOverflowed(container.scrollWidth > container.clientWidth);
  }, [tabsArray]);

  const scroll = (type = 'next') => {
    const container = containerRef.current;

    const items = container.querySelectorAll('.scroll-item');
    const itemWidth = items[0].offsetWidth;
    const scrollPos =
      type === 'next'
        ? container.scrollLeft + itemWidth * 2
        : container.scrollLeft - itemWidth * 2;

    container.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {tabsArray?.length ? (
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
              'sm:flex items-center space-x-2 h-full',
              {
                'border-base-200 border-b': !disableFullWidthBorder
              },
              'hidden'
            )}
          >
            {isOverflowed && (
              <Button
                variant="minimal"
                onClick={() => scroll('prev')}
                wrapperClassName="items-stretch"
              >
                <ChevronLeftIcon className="text-base-200 hover:text-base-500 h-6 w-6" />
              </Button>
            )}
            <nav
              ref={containerRef}
              className={twClassNames(
                '-mb-px flex overflow-y-scroll scrollbar-hide flex-1',
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
            {isOverflowed && (
              <Button variant="minimal" onClick={() => scroll()}>
                <ChevronRightIcon className="text-base-200 hover:text-base-500 h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      ) : null}
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
