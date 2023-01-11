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
    selectedProjectId,
    onProjectChange,
  } = useSideNav();

  if (location.pathname === AppRoute.LANDING) return '';

  return (
    <SidebarNavigation
      wrapperClass="mt-16"
      sidebarPrimaryNavigation={primaryNavs?.map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={activeRoute?.id === item.id}
          handleNavigationClick={onLinkChange}
        />
      ))}
      sidebarSecondaryNavigation={secondaryNavs?.map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={activeRoute?.id === item.id}
          handleNavigationClick={onLinkChange}
        />
      ))}
      sidebarHeader={
        showProjects && (
          <SidebarHeader
            dropdownOptions={allProjectsDrop}
            onDropdownValueChange={onProjectChange}
            dropdownValue={allProjectsDrop.find(
              (item) => `${item.value}` === selectedProjectId,
            )}
          />
        )
      }
    />
  );
};

export default SideNav;
