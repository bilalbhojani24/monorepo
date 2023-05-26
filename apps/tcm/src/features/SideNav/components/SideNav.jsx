import React from 'react';
import { useLocation } from 'react-router-dom';
// import { Virtuoso } from 'react-virtuoso';
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
  // TMActionPanel,
  TMButton,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';
import { AddProjects } from 'features/Projects';

import CancelModal from '../../ImportProgress/components/CancelModal';
import ImportDetailsModal from '../../ImportProgress/components/ImportDetailsModal';
import { noNavRoutes } from '../const/navsConst';

import useSideNav from './useSideNav';

const SideNav = () => {
  const location = useLocation();
  const {
    // selectMenuRef,
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
    // onGetADemoCTAClick,
    closeTooltipHandler,
    showImportInProgTooltip
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
            {/* <TMActionPanel
              title="Have questions?"
              description="Unlock the full potential of Test Management"
              content={
                <TMButton colors="white" onClick={onGetADemoCTAClick}>
                  Get a demo
                </TMButton>
              }
            /> */}
            {secondaryNavs?.map((item) => {
              if (item.id === 'import_in_progress' && !isTooltipDismissed) {
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
                          Import in Progress
                          <MdClose
                            className="h-5 w-5 hover:cursor-pointer"
                            onClick={closeTooltipHandler}
                          />
                        </TMTooltipHeader>
                        <TMTooltipBody>
                          <div>You can track progress of</div>
                          <div>import by clicking here</div>
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
