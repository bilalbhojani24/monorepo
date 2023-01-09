import React from 'react';
import { SectionHeadings } from '@browserstack/bifrost';

import useTestCases from './useTestCases';

const AddTestCase = () => {
  const { selectedFolder, hideTestCaseAdditionPage } = useTestCases();

  return (
    <div className="w-full border-l border-base-200 p-2 pt-4">
      <SectionHeadings
        title={`${selectedFolder?.name}/`}
        variant="buttons"
        secondaryButtonProps={{ children: 'Save' }}
        primaryButtonProps={{
          children: 'Cancel',
          variant: 'white',
          onClick: hideTestCaseAdditionPage,
        }}
      />
    </div>
  );
};

export default AddTestCase;
