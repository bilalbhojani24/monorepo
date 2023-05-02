import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineDescription, MdSaveAlt } from '@browserstack/bifrost';
import { SourceOutlinedIcon } from 'assets/icons';
import { TMButton, TMEmptyState } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { setCurrentTestManagementTool } from '../../quickImportFlow/slices/importSlice';

import InlineAddTestCase from './AddEditTestCase/InlineAddTestCase';
import useTestCases from './useTestCases';

const BlankPage = forwardRef((props, ref) => {
  const { projectId, folderId } = useTestCases();
  const dispatch = useDispatch();
  const urlQueryParam = {};
  if (folderId) urlQueryParam.folder = folderId;

  return (
    <div className="flex w-full flex-col flex-wrap justify-center">
      <TMEmptyState
        title={<p className="text-base-800">Add Test Cases</p>}
        description="You can create test cases by entering details below"
        mainIcon={<SourceOutlinedIcon className="text-base-400 !h-12 !w-12" />}
        buttonProps={null}
      />
      <div className="w-3/4 self-center p-5">
        <InlineAddTestCase noBorder ref={ref} />
      </div>
      <div className="text-base-500 self-center p-5 text-sm">
        Alternatively, you can import your test case data using below options
      </div>

      <div className="flex justify-center">
        <Link to={routeFormatter(AppRoute.IMPORT_WITH_PROJECTS, { projectId })}>
          <TMButton
            wrapperClassName="ml-4 whitespace-nowrap w-64 py-3"
            variant="rounded"
            colors="white"
            size="large"
            icon={<MdSaveAlt />}
            onClick={() => dispatch(setCurrentTestManagementTool(''))}
          >
            &nbsp;Quick Import
          </TMButton>
        </Link>

        <Link
          to={`${routeFormatter(AppRoute.IMPORT_CSV, {
            projectId
          })}?${new URLSearchParams(urlQueryParam).toString()}`}
        >
          <TMButton
            wrapperClassName="ml-4 whitespace-nowrap w-64 py-3"
            variant="rounded"
            colors="white"
            size="large"
            icon={<MdOutlineDescription />}
          >
            &nbsp;Import from CSV
          </TMButton>
        </Link>
      </div>
    </div>
  );
});

export default BlankPage;
