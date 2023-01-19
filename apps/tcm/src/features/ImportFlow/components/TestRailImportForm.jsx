import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMButton, TMInputField, TMTooltip } from 'common/bifrostProxy';

import { setTestRailsCred } from '../slices/importSlice';

import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const TestRailImportForm = () => {
  const {
    getUserEmail,
    handleInputFieldChange,
    handleTestConnection,
    handleProceed,
  } = useImport();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTestRailsCred({ key: 'email', value: getUserEmail }));
  }, [dispatch, getUserEmail]);

  return (
    <div className="mt-12">
      <div className="flex justify-around">
        <div className="mr-6 w-full">
          <TMInputField
            defaultValue={getUserEmail}
            id="email"
            onChange={handleInputFieldChange('email')}
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
            id="host-name"
            onChange={handleInputFieldChange('host')}
            label={
              <>
                TestRail Host Name
                <span className="ml-1">
                  <TMTooltip
                    theme="dark"
                    content="Host Name is your TestRail’s web address. Eg: https://abcd.testrail.io"
                    placementAlign="start"
                    placementSide="right"
                  >
                    <InfoOutlinedIcon fontSize="inherit" />
                  </TMTooltip>
                </span>
              </>
            }
            placeholder="Enter Host Name"
          />
        </div>
      </div>
      <div className="mt-4 w-1/2">
        <TMInputField
          type="password"
          id="api-key"
          onChange={handleInputFieldChange('key')}
          label={
            <>
              TestRail API Key
              <span className="ml-1">
                <TMTooltip
                  theme="dark"
                  content="API Key is located at My Settings > API Keys"
                  placementAlign="start"
                  placementSide="right"
                >
                  <InfoOutlinedIcon fontSize="inherit" />
                </TMTooltip>
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
