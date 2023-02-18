import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  MdOutlineAddBox,
  SidebarHeader,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { TMButton } from 'common/bifrostProxy';
import { AddProjects } from 'features/Projects';
import PropTypes from 'prop-types';

import { noNavRoutes } from '../const/navsConst';

import useSideNav from './useSideNav';

const SideNav = (props) => {
  const { importStatus } = props;
  const location = useLocation();
  const {
    onLinkChange,
    showAddProject,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProjectId,
    onProjectChange,
    setAddProjectModal
  } = useSideNav();

  if (noNavRoutes.includes(location.pathname)) return '';

  return (
    <>
      <SidebarNavigation
        wrapperClassName={twClassNames('mt-16 bg-white', {
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
            <>
              {allProjectsDrop?.length ? (
                <SidebarHeader
                  dropdownOptions={allProjectsDrop}
                  onDropdownValueChange={onProjectChange}
                  dropdownValue={allProjectsDrop.find(
                    (item) => `${item.value}` === selectedProjectId
                  )}
                />
              ) : (
                <div className="w-full p-2">
                  <TMButton
                    wrapperClassName="w-full"
                    variant="secondary"
                    size="large"
                    onClick={() => setAddProjectModal(true)}
                    icon={<MdOutlineAddBox />}
                  >
                    Create Project
                  </TMButton>
                </div>
              )}
            </>
          )
        }
      />
      <AddProjects
        show={showAddProject}
        onClose={() => setAddProjectModal(false)}
      />
    </>
  );
};

SideNav.propTypes = {
  importStatus: PropTypes.bool
};

SideNav.defaultProps = {
  importStatus: false
};

export default SideNav;
