import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ onUpdate, children, className, showCount }) => {
  const defaultTabIndex = 0;
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex);

  const items = [];
  React.Children.forEach(children, (element) => {
    if (React.isValidElement(element)) {
      const { label, value, children: component } = element.props;
      items.push({
        label,
        value,
        component
      });
    }
  });

  const handleUpdate = ({ value }) => {
    setActiveTabIndex(items.findIndex((item) => item.value === value));
    if (onUpdate) {
      onUpdate(value);
    }
  };

  const renderItem = () => {
    const selectedTab = items[activeTabIndex];
    return selectedTab ? selectedTab.component : null;
  };

  return (
    <>
      {/* <TabsList
        onTabChange={handleUpdate}
        tabs={items}
        defaultIndex={defaultTabIndex}
        className={className}
        size="small"
        showCount={Math.min(items.length, showCount)}
        ariaControls="base-tabs-tab-"
      /> */}
      <section className="tabs-container">{renderItem()}</section>
    </>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  onUpdate: PropTypes.func,
  className: PropTypes.string,
  showCount: PropTypes.number.isRequired
};

Tabs.defaultProps = {
  onUpdate: null,
  className: ''
};

export default Tabs;
