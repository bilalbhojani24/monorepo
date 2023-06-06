import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { logEvent } from '@browserstack/utils';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';

import ClustersListing from './ClustersListing';
import GridsListing from './GridsListing';
import useGridConsole from './useGridConsole';

const GridConsole = () => {
  const { currentListingType, setCurrentListingType } = useGridConsole();

  const navigate = useNavigate();

  const options = [
    {
      id: 'helm/kubectl',
      value: 'Helm/KubeCTL',
      body: 'Spawn a grid via Helm / KubeCTL'
    },
    { id: 'cli', value: 'CLI', body: 'Spawn a grid with customizations' }
  ];

  const dropdownHandler = (value) => {
    navigate(`${ROUTES.CREATE_GRID}?type=${value.value}`);
  };

  const tabChangeHandler = (e) => {
    if (e.value === 'grids') {
      logEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'grids_clicked'
      });
    } else if (e.value === 'clusters') {
      logEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'clusters_clicked'
      });
    }
    setCurrentListingType(e);
  };

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-6">
        <PageHeadings
          actions={
            <Dropdown onClick={dropdownHandler}>
              <div className="flex">
                <DropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
                  <Button
                    onClick={() => {
                      logEvent(
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
          tabsArray={[
            {
              index: 0,
              name: 'Grids',
              value: 'grids'
            },
            {
              index: 1,
              name: 'Clusters',
              value: 'clusters'
            }
          ]}
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
