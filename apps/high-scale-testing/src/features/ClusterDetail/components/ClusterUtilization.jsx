import React from 'react';
import { EmptyState, MdQueryStats } from '@browserstack/bifrost';

const ClusterUtilization = () => (
  // eslint-disable-next-line tailwindcss/no-arbitrary-value
  <div className="m-auto flex h-[calc(100vh-134px-64px)] items-center justify-center">
    <EmptyState
      buttonProps={null}
      description="The utilization data is coming soon."
      mainIcon={<MdQueryStats className="text-base-400 mx-auto h-12 w-12" />}
    />
  </div>
);
export default ClusterUtilization;
