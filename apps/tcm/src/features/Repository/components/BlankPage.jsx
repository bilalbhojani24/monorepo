import React from 'react';
import { SourceOutlinedIcon,
    // FileDownloadIcon
} from 'assets/icons';
import { TMEmptyState, TMButton } from 'common/bifrostProxy';
import {MdSaveAlt, MdOutlineDescription} from '@browserstack/bifrost'
import AppRoute from 'const/routes';
import { Link } from 'react-router-dom';

import InlineAddTestCase from './InlineAddTestCase';

export default function BlankPage() {
  return (
    <div className="flex w-full flex-wrap justify-center">
      <TMEmptyState
        title="Add Test Cases"
        description="You can create test cases by entering details below"
        mainIcon={<SourceOutlinedIcon className="!h-12 !w-12" />}
        buttonProps={null}
      />
      <div className="w-9/12 p-5">
        <InlineAddTestCase noBorder />
      </div>
      <div className="w-9/12 p-5 text-base-500 text-sm text-center">
          <p>Alternatively, you can import your test case data using below options</p>
      </div>
        {/*<p>Alternatively, you can import your test case data using below options</p>*/}

        <div className={"flex justify-center"}>
            <div className="flex-1">
                <Link to={AppRoute.IMPORT}>
                    <TMButton
                        wrapperClassName="ml-4 whitespace-nowrap w-64 py-3"
                        variant="rounded"
                        colors="white"
                        size="large"
                        icon={<MdSaveAlt/>}
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
                        colors={"white"}
                        size={"large"}
                        icon={<MdOutlineDescription/>}
                    >
                        &nbsp;Import from CSV / XLS
                    </TMButton>
                </Link>
            </div>
        </div>
    </div>
  );
}
