import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDescription, MdSaveAlt } from '@browserstack/bifrost';
import { SourceOutlinedIcon } from 'assets/icons';
import { TMButton, TMEmptyState } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import InlineAddTestCase from './InlineAddTestCase';
import useTestCases from './useTestCases';

const BlankPage = forwardRef((props, ref) => {
  const { projectId } = useTestCases();
  return (
    <div className="flex w-full flex-wrap justify-center">
      <TMEmptyState
        title="Add Test Cases"
        description="You can create test cases by entering details below"
        mainIcon={<SourceOutlinedIcon className="!h-12 !w-12" />}
        buttonProps={null}
      />
      <div className="w-9/12 p-5">
        <InlineAddTestCase noBorder ref={ref} />
      </div>
      <div className="text-base-500 w-9/12 p-5 text-center text-sm">
        <p>
          Alternatively, you can import your test case data using below options
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex-1">
          <Link
            to={routeFormatter(AppRoute.IMPORT_WITH_PROJECTS, { projectId })}
          >
            <TMButton
              wrapperClassName="ml-4 whitespace-nowrap w-64 py-3"
              variant="rounded"
              colors="white"
              size="large"
              icon={<MdSaveAlt />}
            >
              &nbsp;Quick Import
            </TMButton>
          </Link>
        </div>
        <div className="flex-1">
          <Link to={AppRoute.IMPORT_CSV}>
            <TMButton
              wrapperClassName="ml-4 whitespace-nowrap w-64 py-3"
              variant="rounded"
              colors="white"
              size="large"
              icon={<MdOutlineDescription />}
            >
              &nbsp;Import from CSV / XLS
            </TMButton>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default BlankPage;
