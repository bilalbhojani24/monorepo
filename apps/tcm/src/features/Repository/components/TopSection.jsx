import React from 'react';
import { PageHeadings } from '@browserstack/bifrost';

const TopSection = () => (
  <div className="w-full">
    <PageHeadings
      heading="Repository"
      actionsData={[
        {
          id: 'node-1',
          actionsNode: <>Add Test Case</>,
          actionFn: () => {
            console.log('Action button fn 1');
          },
          variant: 'primary',
        },
      ]}
    />
  </div>
);

export default TopSection;
