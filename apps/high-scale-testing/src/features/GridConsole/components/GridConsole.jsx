import React from 'react';
import {
  Button,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  MdKeyboardArrowDown,
  PageHeadings,
  Tabs
} from '@browserstack/bifrost';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';

import ClustersListing from './ClustersListing';
import GridsListing from './GridsListing';
import useGridConsole from './useGridConsole';

const GridConsole = () => {
  const {
    currentListingType,
    dropdownHandler,
    options,
    showCreateGridButton,
    tabChangeHandler,
    tabsArray
  } = useGridConsole();

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-6">
        <PageHeadings
          actions={
            <Dropdown onClick={dropdownHandler}>
              <div className="flex">
                {showCreateGridButton && (
                  <DropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
                    <Button
                      onClick={() => {
                        logHSTEvent(
                          ['amplitude'],
                          'web_events',
                          AGAutomationConsoleInteracted,
                          { action: 'creategrid_clicked' }
                        );
                      }}
                      size="default"
                      icon={<MdKeyboardArrowDown />}
                      iconPlacement="end"
                    >
                      Create Grid
                    </Button>
                  </DropdownTrigger>
                )}
              </div>

              <DropdownOptionGroup wrapperClassName="w-full">
                {options.map((opt) => (
                  <DropdownOptionItem key={opt.value} option={opt} />
                ))}
              </DropdownOptionGroup>
            </Dropdown>
          }
          breadcrumbs={null}
          heading="Automation Console"
        />
        <Tabs
          tabsArray={tabsArray}
          onTabChange={tabChangeHandler}
          defaultIndex={currentListingType.index}
        />
      </div>

      {currentListingType.value === 'grids' && <GridsListing />}
      {currentListingType.value === 'clusters' && <ClustersListing />}
    </div>
  );
};

export default GridConsole;
