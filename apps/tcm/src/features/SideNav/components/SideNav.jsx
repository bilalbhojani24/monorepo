import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  MdClose,
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
import {
  TMActionPanel,
  TMButton,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';
import CancelModal from 'features/ImportProgress/components/CancelModal';
import ImportDetailsModal from 'features/ImportProgress/components/ImportDetailsModal';
import { AddProjects } from 'features/Projects';

import { noNavRoutes } from '../const/navsConst';

import useSideNav from './useSideNav';

const SideNav = () => {
  const location = useLocation();
  const {
    hasProjects,
    isAllProjectsLoading,
    isDetailsModalVisible,
    isCancelModalVisible,
    onLinkChange,
    showAddProject,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProjectId,
    isTooltipDismissed,
    handleHover,
    onProjectChange,
    setAddProjectModal,
    closeTooltipHandler,
    showImportInProgTooltip,
    onGetADemoCTAClick
  } = useSideNav();

  if (noNavRoutes.includes(location.pathname)) return '';

  return (
    <>
      <SidebarNavigation
        wrapperClassName={twClassNames('mt-16 bg-white')}
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
                <TMButton colors="white" onClick={onGetADemoCTAClick}>
                  Get a demo
                </TMButton>
              }
            />
            {secondaryNavs?.map((item) => {
              if (
                item?.identifier === 'import_in_progress' &&
                !isTooltipDismissed
              ) {
                return (
                  <TMTooltip
                    size="xs"
                    placementSide="top"
                    theme="dark"
                    sideOffset={-10}
                    show={showImportInProgTooltip}
                    content={
                      <>
                        <TMTooltipHeader wrapperClassName="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Import in Progress
                          </span>
                          <MdClose
                            className="h-5 w-5 hover:cursor-pointer"
                            onClick={closeTooltipHandler}
                          />
                        </TMTooltipHeader>
                        <TMTooltipBody>
                          <div className="text-sm font-normal">
                            <div>You can track progress of</div>
                            <div>import by clicking here</div>
                          </div>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    <div
                      onMouseEnter={() => handleHover('enter', item)}
                      onMouseLeave={() => handleHover('leave', item)}
                    >
                      <SidebarItem
                        key={item.id}
                        nav={item}
                        current={activeRoute?.id === item.id}
                        handleNavigationClick={onLinkChange}
                      />
                    </div>
                  </TMTooltip>
                );
              }
              return (
                <div
                  onMouseEnter={() => handleHover('enter', item)}
                  onMouseLeave={() => handleHover('leave', item)}
                >
                  <SidebarItem
                    key={item.id}
                    nav={item}
                    current={activeRoute?.id === item.id}
                    handleNavigationClick={onLinkChange}
                  />
                </div>
              );
            })}
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
                      {allProjectsDrop.map((item) => (
                        <SelectMenuOptionItem key={item.value} option={item} />
                      ))}
                    </SelectMenuOptionGroup>
                  </SelectMenu>
                </SidebarHeader>
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
          ) : null
        }
      />
      <AddProjects
        isFirstProject={!hasProjects}
        show={showAddProject}
        onClose={() => setAddProjectModal(false)}
      />
      <ImportDetailsModal
        headerText="Quick Import"
        show={isDetailsModalVisible}
      />
      <CancelModal show={isCancelModalVisible} />
    </>
  );
};

export default SideNav;
