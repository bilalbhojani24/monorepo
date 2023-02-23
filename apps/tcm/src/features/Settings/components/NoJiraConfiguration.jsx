import React from 'react';
import { MdOutlineLayers } from '@browserstack/bifrost';
import { OpenInNewIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';

const NoJiraConfiguration = () => (
  <div className="border-base-200 flex flex-col items-center justify-center rounded-lg border bg-white py-9">
    <div>
      <MdOutlineLayers className="h-10 w-10" />
    </div>
    <div className="text-base-900 mt-4 mb-2 text-base font-semibold">
      No JIRA Integrations Added
    </div>
    <div className="text-base-400 mb-6 text-base">
      Get started by clicking on the button below to create a folder
    </div>
    <TMButton
      size="large"
      iconPlacement="end"
      icon={<OpenInNewIcon className="h-4 w-4" />}
    >
      Add JIRA Integration
    </TMButton>
  </div>
);

export default NoJiraConfiguration;
