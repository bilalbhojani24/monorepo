import React, { useEffect } from 'react';
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
import ROUTES from 'constants/routes';

import ClustersListing from './ClustersListing';
import GridsListing from './GridsListing';
import useGridConsole from './useGridConsole';

const GridConsole = () => {
  const { currentListingType, setCurrentListingType } = useGridConsole();

  const navigate = useNavigate();

  const options = [
    { id: 'helm/kubectl', body: 'Helm/KubeCTL' },
    { id: 'cli', body: 'CLI' }
  ];

  const dropdownHandler = (value) => {
    navigate(`${ROUTES.CREATE_GRID}?type=${value.body}`);
  };

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-6">
        <PageHeadings
          actions={
            <Dropdown onClick={dropdownHandler}>
              <div className="flex">
                <DropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
                  <Button icon={<MdKeyboardArrowDown />} iconPlacement="end">
                    Create Grid
                  </Button>
                </DropdownTrigger>
              </div>

              <DropdownOptionGroup>
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
          onTabChange={(e) => setCurrentListingType(e)}
          defaultIndex={currentListingType.index}
        />
      </div>

      {currentListingType.value === 'grids' && <GridsListing />}
      {currentListingType.value === 'clusters' && <ClustersListing />}
    </div>
  );
};

export default GridConsole;
