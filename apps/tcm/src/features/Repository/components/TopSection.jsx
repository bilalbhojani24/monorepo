import React from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineExpandMore } from '@browserstack/bifrost';
import { TMButton, TMDropdown, TMPageHeadings } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { setCurrentTestManagementTool } from '../../quickImportFlow/slices/importSlice';
import { IMPORT_OPTIONS } from '../const/topSectionConst';

import useAddEditTestCase from './AddEditTestCase/useAddEditTestCase';

const TopSection = () => {
  const {
    showTestCaseAdditionPage,
    goToThisURL,
    isAddTestCasePageVisible,
    folderId,
    projectId
  } = useAddEditTestCase();

  const dispatch = useDispatch();
  const handleDropdownOptionClick = (selectedOption) => {
    if (selectedOption?.route) goToThisURL(selectedOption?.route);
    dispatch(setCurrentTestManagementTool(''));
  };
  const queryParams = folderId ? { folder: folderId } : {};

  return (
    <div className="w-full">
      <TMPageHeadings
        heading="Test Cases"
        actions={
          <>
            {!isAddTestCasePageVisible && (
              <TMButton
                variant="primary"
                colors="white"
                onClick={showTestCaseAdditionPage}
              >
                Create Test Case
              </TMButton>
            )}
            <div className="flex">
              <TMButton
                variant="primary"
                size="default"
                colors="white"
                // onClick={showAddProjectModal}
                onClick={() =>
                  goToThisURL(
                    `${routeFormatter(AppRoute.IMPORT_CSV, {
                      projectId
                    })}?${new URLSearchParams(queryParams).toString()}`,
                    true
                  )
                }
                wrapperClassName="ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10"
              >
                Import via CSV
              </TMButton>
              <TMDropdown
                triggerIcon={
                  <MdOutlineExpandMore className="text-2xl text-black" />
                }
                optionGroupWrapperClassName="w-32"
                triggerClassName="rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10 border-l-0 bg-white"
                triggerVariant="menu-button"
                options={IMPORT_OPTIONS}
                onClick={handleDropdownOptionClick}
              />
            </div>
          </>
        }
      />
    </div>
  );
};

export default TopSection;
