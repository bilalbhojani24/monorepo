import React from 'react';
import { TMDataTable } from 'common/bifrostProxy';
import CopyButton from 'common/CopyButton';
import PropTypes from 'prop-types';

const JiraFooter = ({ apiKey }) => {
  const COLUMNS = [
    { name: 'API Key', key: 'apiKey' },
    { name: '', key: 'action' }
  ];

  const rows = [
    {
      apiKey: `${apiKey?.replace(
        apiKey?.substring(2, apiKey?.length - 2),
        '*'.repeat(apiKey?.length - 4)
      )}`,
      action: (
        <CopyButton copyValue={apiKey}>
          <button type="button" className="text-brand-400">
            Copy
          </button>
        </CopyButton>
      )
    }
  ];
  return (
    <div className="mt-10">
      <div className="text-base-900 text-lg font-medium">Active API Key</div>
      <div className="text-base-500 text-sm">
          Below is active API key for your account
      </div>
      <TMDataTable
        columns={COLUMNS}
        rows={rows}
        containerWrapperClass="mt-6"
        tableWrapperClass="text-base-900"
      />
    </div>
  );
};

JiraFooter.propTypes = {
  apiKey: PropTypes.string.isRequired
};

export default JiraFooter;
