import React, { useMemo } from 'react';
import { SidebarItem } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function InfoSidebar({ tabs, onChange, activeTab }) {
  const sidebarOptions = useMemo(
    () =>
      tabs.map((tab) => ({
        id: tab.value,
        label: tab.label,
        activeIcon: () => <></>,
        inActiveIcon: () => <></>
      })),
    [tabs]
  );

  return (
    <aside className="sticky top-0 w-40 max-w-xs pr-6">
      {sidebarOptions.map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={activeTab === item.id}
          handleNavigationClick={onChange}
        />
      ))}
    </aside>
  );
}

InfoSidebar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
  activeTab: PropTypes.string.isRequired
};

InfoSidebar.defaultProps = {
  tabs: [],
  onChange: () => {}
};
