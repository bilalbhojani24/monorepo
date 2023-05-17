import React from 'react';
import { useLocation } from 'react-router-dom';
// import { Virtuoso } from 'react-virtuoso';
import {
  MdOutlineAddBox,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  SidebarHeader,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { TMActionPanel, TMButton } from 'common/bifrostProxy';
import { AddProjects } from 'features/Projects';
import PropTypes from 'prop-types';

import { noNavRoutes } from '../const/navsConst';

import useSideNav from './useSideNav';

const SideNav = (props) => {
  const { importStatus } = props;
  const location = useLocation();
  const {
    // selectMenuRef,
    hasProjects,
    isAllProjectsLoading,
    onLinkChange,
    showAddProject,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProjectId,
    onProjectChange,
    setAddProjectModal,
    onGetADemoCTAClick
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
        sidebarSecondaryNavigation={
          <>
            <TMActionPanel
              title="Have questions?"
              description="Unlock the full potential of Test Management"
              content={
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.browserstack.com/contact?ref=test-management-dashboard-demo-lead"
                >
                  <TMButton colors="white" onClick={onGetADemoCTAClick}>
                    Get a demo
                  </TMButton>
                </a>
              }
            />
            {secondaryNavs?.map((item) => (
              <SidebarItem
                key={item.id}
                nav={item}
                current={activeRoute?.id === item.id}
                handleNavigationClick={onLinkChange}
              />
            ))}
          </>
        }
        sidebarHeader={
          showProjects && !isAllProjectsLoading ? (
            <>
              {allProjectsDrop?.length > 1 ? (
                <SidebarHeader>
                  <SelectMenu
                    onChange={onProjectChange}
                    value={
                      allProjectsDrop.find(
                        (item) => `${item.value}` === selectedProjectId
                      ) || null
                    }
                  >
                    <SelectMenuTrigger
                      placeholder="Select.."
                      wrapperClassName="cursor-pointer"
                    />
                    <SelectMenuOptionGroup wrapperClassName="w-56">
                      {/* <Virtuoso
                        customScrollParent={
                          selectMenuRef.current || document.body
                        }
                        data={allProjectsDrop}
                        // endReached={loadMore}
                        overscan={100}
                        itemContent={(index, item) => (
                          <SelectMenuOptionItem
                            key={item.value}
                            option={item}
                          />
                        )}
                        // components={{
                        //   Footer: isLoadingMore ? LoadingFooter : null
                        // }}
                      /> */}
                      {allProjectsDrop.map((item) => (
                        <SelectMenuOptionItem key={item.value} option={item} />
                      ))}
                    </SelectMenuOptionGroup>
                  </SelectMenu>
                </SidebarHeader>
              ) : (
                <div className="w-full p-2">
                  ƒ
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
          ) : null
        }
      />
      <AddProjects
        isFirstProject={!hasProjects}
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
