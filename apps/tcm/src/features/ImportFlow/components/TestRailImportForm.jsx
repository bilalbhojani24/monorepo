import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMButton, TMInputField } from 'bifrostProxy';

import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const TestRailImportForm = () => {
  const {
    apiRef,
    emailRef,
    hostRef,
    getUserEmail,
    handleTestConnection,
    handleProceed,
  } = useImport();

  return (
    <div className="mt-12">
      <div className="space-around flex">
        <div className="mr-6 w-full">
          <TMInputField
            ref={emailRef}
            defaultValue={getUserEmail}
            id="email"
            label={
              <>
                TestRail Email Address
                <span className="ml-1">
                  <InfoOutlinedIcon fontSize="inherit" />
                </span>
              </>
            }
          />
        </div>
        <div className="w-full">
          <TMInputField
            ref={hostRef}
            id="host-name"
            label={
              <>
                TestRail Host Name
                <span className="ml-1">
                  <InfoOutlinedIcon fontSize="inherit" />
                </span>
              </>
            }
            placeholder="Enter Host Name"
          />
        </div>
      </div>
      <div className="mt-4 w-1/2">
        <TMInputField
          ref={apiRef}
          type="password"
          id="api-key"
          label={
            <>
              TestRail API Key
              <span className="ml-1">
                <InfoOutlinedIcon fontSize="inherit" />
              </span>
            </>
          }
          placeholder="Enter API Key"
        />
      </div>
      <TermsAndConditions />
      <div className="flex justify-end">
        <TMButton
          colors="white"
          variant="primary"
          size="default"
          wrapperClassName="mr-3"
          onClick={handleTestConnection}
        >
          Test Connection
        </TMButton>
        <TMButton
          colors="brand"
          variant="primary"
          size="default"
          onClick={handleProceed}
        >
          Proceed
        </TMButton>
      </div>
    </div>
  );
};

export default TestRailImportForm;
