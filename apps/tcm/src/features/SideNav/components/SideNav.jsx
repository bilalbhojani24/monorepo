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
  } = useSideNav();

  if (location.pathname === AppRoute.LANDING) return '';

  return (
    <SidebarNavigation
      wrapperClass="mt-16"
      // primaryNavItems={primaryNavs}
      // active={activeRoute}
      // handleClick={onLinkChange}
      // selectOptions={allProjectsDrop}
      // withSelect={showProjects}
      // secondaryNavItems={secondaryNavs}
      sidebarPrimaryNavigation={primaryNavs?.map((item, idx) => (
        <React.Fragment key={Math.random()}>
          <SidebarItem nav={item} current={idx === 3} />
        </React.Fragment>
      ))}
      sidebarSecondaryNavigation={secondaryNavs?.map((item, idx) => (
        <React.Fragment key={Math.random()}>
          <SidebarItem nav={item} current={idx === 3} />
        </React.Fragment>
      ))}
      sidebarHeader={<SidebarHeader dropdownOptions={allProjectsDrop} />}
    />
  );
};

export default SideNav;
