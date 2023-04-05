import React, { useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from '../Icon';
import SelectMenu from '../SelectMenu';
import SelectMenuOptionGroup from '../SelectMenuOptionGroup';
import SelectMenuOptionItem from '../SelectMenuOptionItem';
import SelectMenuTrigger from '../SelectMenuTrigger';

import Tab from './components/Tab';
import { TAB_SHAPE } from './const/tabsConstants';
import { useTabs } from './useTabs';

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
  navigationClassName,
  isSlideableTabs
}) => {
  const containerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(
    tabsArray ? tabsArray[0] : null
  );
  const { disableNext, disablePrev, scroll, handleScroll, isOverflowed } =
    useTabs(containerRef, tabsArray, isSlideableTabs);

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
            {isSlideableTabs && isOverflowed && !isContained && (
              <Button
                variant="minimal"
                onClick={() => scroll('prev')}
                disabled={disablePrev}
                colors="white"
                aria-label="Previous Arrow"
              >
                <MdOutlineChevronLeft className="h-6 w-6" />
              </Button>
            )}
            <nav
              ref={containerRef}
              className={twClassNames(
                '-mb-px flex flex-1',
                {
                  'space-x-8': !isFullWidth,
                  'border-0': isFullWidth,
                  'isolate flex divide-x divide-base-200 rounded-lg shadow space-x-0':
                    isContained,
                  'overflow-y-scroll scrollbar-hide ':
                    isSlideableTabs && !isContained
                },

                navigationClassName
              )}
              aria-label="Tabs"
              {...(isSlideableTabs && { onScroll: handleScroll })}
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
            {isSlideableTabs && isOverflowed && !isContained && (
              <Button
                variant="minimal"
                onClick={() => scroll()}
                disabled={disableNext}
                colors="white"
                aria-label="Next Arrow"
              >
                <MdOutlineChevronRight className=" h-6 w-6" />
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
  isSlideableTabs: PropTypes.bool,
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
  isSlideableTabs: false,
  wrapperClassName: '',
  navigationClassName: ''
};

export default Tabs;
