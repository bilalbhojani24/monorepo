import React from 'react';
import { MdOutlineLayers } from '@browserstack/bifrost';
import { OpenInNewIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const NoJiraConfiguration = ({ onAddJiraIntegration }) => (
  <div className="border-base-200 flex flex-col items-center justify-center rounded-lg border bg-white py-9">
    <div>
      <MdOutlineLayers className="h-10 w-10" />
    </div>
    <div className="text-base-900 mt-4 mb-2 text-base font-semibold">
      No JIRA Integration Added
    </div>
    <div className="text-base-400 mb-6 text-base">
      Get started by clicking on the button below to link a JIRA instance
    </div>
    <TMButton
      size="large"
      iconPlacement="end"
      icon={<OpenInNewIcon className="h-4 w-4" />}
      onClick={onAddJiraIntegration}
    >
      Add JIRA Integration
    </TMButton>
  </div>
);

NoJiraConfiguration.propTypes = {
  onAddJiraIntegration: PropTypes.func
};

NoJiraConfiguration.defaultProps = {
  onAddJiraIntegration: () => {}
};

export default NoJiraConfiguration;
