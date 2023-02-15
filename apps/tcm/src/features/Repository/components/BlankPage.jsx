import React from 'react';
import { SourceOutlinedIcon } from 'assets/icons';
import { TMEmptyState } from 'common/bifrostProxy';

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
    </div>
  );
}
