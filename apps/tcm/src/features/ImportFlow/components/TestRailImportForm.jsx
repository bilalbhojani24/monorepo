import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMAlerts, TMInputField } from 'common/bifrostProxy';

import { setTestRailsCred } from '../slices/importSlice';

import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const TestRailImportForm = () => {
  const {
    connectionStatus,
    getUserEmail,
    handleInputFieldChange,
    testRailsCred,
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
            value={testRailsCred.host}
            onChange={handleInputFieldChange('host')}
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
      <div className="my-4 w-1/2">
        <TMInputField
          type="password"
          id="api-key"
          value={testRailsCred.key}
          onChange={handleInputFieldChange('key')}
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
      {connectionStatus && (
        <TMAlerts
          accentBorder={false}
          show={!!connectionStatus}
          modifier={connectionStatus}
          title={
            connectionStatus === 'success'
              ? 'Connection was successful. Proceed to continue.'
              : 'Connection was not successful. Try again.'
          }
          linkText={null}
        />
      )}
      <TermsAndConditions />
    </div>
  );
};

export default TestRailImportForm;
