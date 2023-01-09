import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarNavigation } from '@browserstack/bifrost';
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

  if (location.pathname === AppRoute.ROOT) return '';

  return (
    <div>
      <SidebarNavigation
        wrapperClass="mt-16"
        primaryNavItems={primaryNavs}
        active={activeRoute}
        handleClick={onLinkChange}
        selectOptions={allProjectsDrop}
        withSelect={showProjects}
        secondaryNavItems={secondaryNavs}
      />
    </div>
  );
};

export default SideNav;
