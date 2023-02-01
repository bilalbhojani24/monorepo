import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  SidebarHeader,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/bifrost/utils/tailwindUtils';
import AppRoute from 'const/routes';
import PropTypes from 'prop-types';

import useSideNav from './useSideNav';

const SideNav = (props) => {
  const { importStatus } = props;
  const location = useLocation();
  const {
    onLinkChange,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProjectId,
    onProjectChange
  } = useSideNav();

  if (location.pathname === AppRoute.LANDING) return '';

  return (
    <SidebarNavigation
      wrapperClass={twClassNames('mt-16 bg-white', {
        'mt-32': importStatus === 'ongoing'
      })}
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
              (item) => `${item.value}` === selectedProjectId
            )}
          />
        )
      }
    />
  );
};

SideNav.propTypes = {
  importStatus: PropTypes.bool
};

SideNav.defaultProps = {
  importStatus: false
};

export default SideNav;
