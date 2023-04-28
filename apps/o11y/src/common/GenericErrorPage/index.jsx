import React from 'react';
import { MdErrorOutline } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';

function GenericErrorPage() {
  return (
    <div className="bg-base-50 flex h-screen w-screen items-center justify-center">
      <div className="border-base-300 flex h-72 w-screen max-w-xl items-center justify-center rounded-md border bg-white">
        <O11yEmptyState
          title="We're sorry, but something went wrong."
          description="We've been notified about this issue and we'll take a look at it shortly."
          mainIcon={
            <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Reload',
            onClick: () => window.location.reload(),
            size: 'default'
          }}
        />
      </div>
    </div>
  );
}

export default GenericErrorPage;
