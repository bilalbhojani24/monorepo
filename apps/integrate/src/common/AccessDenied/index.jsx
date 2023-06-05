import React from 'react';
import { MdNotInterested } from '@browserstack/bifrost';

import { INTGEmptyState } from '../bifrostProxy';

const AccessDenied = () => (
  <div className="bg-base-50 flex h-screen w-screen items-center justify-center">
    <div className="border-base-300 flex h-72 w-screen max-w-xl items-center justify-center rounded-md border">
      <INTGEmptyState
        title="Access Denied"
        description="You do not have required permissions to access this resource."
        mainIcon={
          <MdNotInterested className="text-danger-600 inline-block !h-12 !w-12" />
        }
        buttonProps={null}
      />
    </div>
  </div>
);
export default AccessDenied;
