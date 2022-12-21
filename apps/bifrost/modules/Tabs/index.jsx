import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Tab from './components/Tab';

const Tabs = ({ defaultIndex, id, label, onTabChange, tabsArray }) => {
  const [selectedTab, setSelectedTab] = useState(tabsArray ? tabsArray[0] : null);

  const onTabClickHandler = (event, clickedTab) => {
    const thisTab = clickedTab ? clickedTab : tabsArray.find((tab) => tab.name === event.currentTarget.value);
    setSelectedTab(thisTab);
    onTabChange(thisTab, event);
  };

  useEffect(() => {
    if (defaultIndex && tabsArray?.length && tabsArray[defaultIndex]) setSelectedTab(tabsArray[defaultIndex]);
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
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              defaultValue={selectedTab?.name}
            >
              {tabsArray?.map((tab) => <option key={tab.name}>{tab.name}</option>)}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabsArray?.map((tab, index) => (
                  <Tab
                    tab={tab}
                    key={tab.name}
                    isCurrent={selectedTab?.name === tab.name}
                    onTabClick={onTabClickHandler}
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
  label: PropTypes.string,
  onTabChange: PropTypes.func,
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
  label: '',
  onTabChange: () => {}
};

export default Tabs;
