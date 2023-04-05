import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  MdAccountCircle,
  MdDashboard,
  MdListAlt,
  MdLogin,
  MdTune,
  SidebarNavigationWCollapse
} from '@browserstack/bifrost';

import UserNavModal from './UserNavModal';
import useSidebar from './useSidebar';

const sideNavIcons = {
  dashboard: <MdDashboard className="text-base-500 h-6 w-6" />,
  testHistory: <MdListAlt className="text-base-500 h-6 w-6" />,
  thresholdPresets: <MdTune className="text-base-500 h-6 w-6" />,
  logIn: <MdLogin className="text-base-500 h-6 w-6" />,
  logOut: <MdAccountCircle className="text-base-500 h-6 w-6" />
};

const Sidebar = () => {
  const {
    primaryNavs,
    secondaryNavs,
    sidebarClicked,
    showUserNavModal,
    setShowUserNavModal
  } = useSidebar(sideNavIcons);

  return (
    <div className="flex max-h-[calc(100%-2rem)] flex-1">
      <div id="sidebarContainer" className="flex flex-1">
        <div className="flex">
          <SidebarNavigationWCollapse
            wrapperClassName="relative"
            sidebarPrimaryNavigation={primaryNavs}
            sidebarSecondaryNavigation={secondaryNavs}
            collapsedCutoff={1280}
            onClick={sidebarClicked}
          />
        </div>

        <div
          id="contentContainer"
          className="flex w-full max-w-[calc(100%-3.25rem)] flex-1 overflow-scroll"
        >
          <Outlet />
        </div>

        <UserNavModal
          showUserNavModal={showUserNavModal}
          setShowUserNavModal={setShowUserNavModal}
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
