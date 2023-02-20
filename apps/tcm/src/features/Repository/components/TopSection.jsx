import React from 'react';
import { MdOutlineExpandMore } from '@browserstack/bifrost';
import { TMButton, TMDropdown, TMPageHeadings } from 'common/bifrostProxy';
import AppRoute from 'const/routes';

import { IMPORT_OPTIONS } from '../const/topSectionConst';

import useAddEditTestCase from './useAddEditTestCase';

const TopSection = () => {
  const { showTestCaseAdditionPage, goToThisURL, isAddTestCasePageVisible } =
    useAddEditTestCase();

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
                onClick={() => goToThisURL(AppRoute.IMPORT_CSV)}
                wrapperClassName="ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10"
              >
                Import via CSV
              </TMButton>
              <TMDropdown
                triggerIcon={
                  <MdOutlineExpandMore className="text-2xl text-black" />
                }
                triggerClassName="rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10 border-l-0 bg-white"
                triggerVariant="menu-button"
                options={IMPORT_OPTIONS}
                onClick={(selectedOption) =>
                  selectedOption?.route
                    ? goToThisURL(selectedOption?.route)
                    : null
                }
              />
            </div>
          </>
        }
      />
    </div>
  );
};

export default TopSection;
