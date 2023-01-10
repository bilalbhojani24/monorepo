import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SidebarHeader,
  SidebarItem,
  SidebarNavigation,
} from '@browserstack/bifrost';
import AppRoute from 'const/routes';

import useSideNav from './useSideNav';

const SideNav = () => {
  const location = useLocation();
  const {
    onLinkChange,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProject,
    selectedProjectId,
    onProjectChange,
  } = useSideNav();

  if (location.pathname === AppRoute.LANDING) return '';

  return (
    <SidebarNavigation
      wrapperClass="mt-16"
      sidebarPrimaryNavigation={primaryNavs?.map((item) => (
        <React.Fragment key={Math.random()}>
          <SidebarItem
            nav={item}
            current={activeRoute?.id === item.id}
            handleNavigationClick={onLinkChange}
          />
        </React.Fragment>
      ))}
      sidebarSecondaryNavigation={secondaryNavs?.map((item) => (
        <React.Fragment key={Math.random()}>
          <SidebarItem
            nav={item}
            current={activeRoute?.id === item.id}
            handleNavigationClick={onLinkChange}
          />
        </React.Fragment>
      ))}
      sidebarHeader={
        showProjects && (
          <SidebarHeader
            dropdownOptions={allProjectsDrop}
            onDropdownValueChange={onProjectChange}
            // dropdownValue={selectedProject}
          />
        )
      }
    />
  );
};

export default SideNav;
