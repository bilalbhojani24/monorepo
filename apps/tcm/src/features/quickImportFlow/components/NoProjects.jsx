import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMEmptyState } from 'common/bifrostProxy';

const NoProjects = () => (
  <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
    <TMEmptyState
      title="No Projects fetched"
      description="We couldn’t find any project linked with your account. Try connecting with a different account instead"
      mainIcon={<InfoOutlinedIcon className="text-base-400 h-12 w-12" />}
      buttonProps={null}
    />
  </div>
);

export default NoProjects;
