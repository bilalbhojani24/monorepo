import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineExpandMore } from '@browserstack/bifrost';
import { TMButton, TMDropdown, TMPageHeadings } from 'common/bifrostProxy';
import AppRoute from 'const/routes';

import { IMPORT_OPTIONS } from '../const/topSectionConst';

import useAddEditTestCase from './useAddEditTestCase';

const TopSection = () => {
  const navigate = useNavigate();
  const { showTestCaseAdditionPage, isAddTestCasePageVisible } =
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
              <Link to={AppRoute.IMPORT_CSV} className="flex flex-1">
                <TMButton
                  variant="primary"
                  size="default"
                  colors="white"
                  // onClick={showAddProjectModal}
                  wrapperClassName="ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10"
                >
                  Import via CSV
                </TMButton>
              </Link>
              <TMDropdown
                triggerIcon={
                  <MdOutlineExpandMore className="text-2xl text-black" />
                }
                triggerClassName="rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10 border-l-0"
                triggerVariant="menu-button"
                options={IMPORT_OPTIONS}
                onClick={(selectedOption) =>
                  selectedOption?.route ? navigate(selectedOption?.route) : null
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
