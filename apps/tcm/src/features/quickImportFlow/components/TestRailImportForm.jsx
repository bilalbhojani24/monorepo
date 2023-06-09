import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  TMAlerts,
  TMInputField,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';

import { INPUT_FIELD_ERROR } from '../const/importConst';
import { TESTRAIL } from '../const/importSteps';

import TermsAndConditions from './TermsAndConditions';
import useConfigureTool from './useConfigureTool';
import useForms from './useForms';

const TestRailImportForm = () => {
  const { testRailsCredTouched, handleInputFieldChange } = useForms();
  const {
    connectionStatusMap,
    testRailsCred,
    loggedInScreen,
    loggedInForTool,
    currentTestManagementTool
  } = useConfigureTool();

  const alreadyLoggedIn =
    loggedInScreen && loggedInForTool === currentTestManagementTool;
  return (
    <>
      <div
        className={twClassNames('flex', {
          'justify-around': !alreadyLoggedIn
        })}
      >
        <div
          className={twClassNames('mr-6', {
            'basis-1/2': alreadyLoggedIn,
            'w-full': !alreadyLoggedIn
          })}
        >
          <TMInputField
            placeholder="Enter Email Address"
            value={testRailsCred.email}
            id="email"
            disabled={alreadyLoggedIn}
            onChange={handleInputFieldChange('email')}
            label="TestRail Email Address"
            errorText={
              !testRailsCred.email && testRailsCredTouched.email
                ? INPUT_FIELD_ERROR
                : ''
            }
          />
        </div>
        {!alreadyLoggedIn && (
          <div className="w-full">
            <TMInputField
              id="host-name"
              value={testRailsCred.host}
              onChange={handleInputFieldChange('host')}
              autoComplete="on"
              label={
                <span className="flex items-center">
                  TestRail Host Name
                  <TMTooltip
                    size="xs"
                    placementSide="right"
                    theme="dark"
                    content={
                      <>
                        <TMTooltipBody>
                          <p className="text-sm">
                            Host Name is your TestRail’s
                            <div>web address.</div>
                            <div>Eg: https://abcd.testrail.io</div>
                          </p>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    <MdInfoOutline className="ml-1 h-4 w-4" />
                  </TMTooltip>
                </span>
              }
              placeholder="Enter Host Name"
              errorText={
                !testRailsCred.host && testRailsCredTouched.host
                  ? INPUT_FIELD_ERROR
                  : ''
              }
            />
          </div>
        )}
      </div>
      {!alreadyLoggedIn && (
        <>
          <div className="my-4 w-1/2 pr-2">
            <TMInputField
              type="password"
              id="api-key"
              value={testRailsCred.key}
              onChange={handleInputFieldChange('key')}
              label={
                <span className="flex items-center">
                  TestRail API Key
                  <TMTooltip
                    size="xs"
                    placementSide="right"
                    theme="dark"
                    content={
                      <>
                        <TMTooltipBody>
                          <p className="text-sm">
                            API Key is located at My Settings &gt; API Keys
                            {testRailsCred.host && (
                              <a
                                href={`${testRailsCred.host}/index.php?/mysettings`}
                                className="mt-3 block cursor-pointer font-medium text-white underline"
                              >
                                Click here to get Token ID
                              </a>
                            )}
                          </p>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    <MdInfoOutline className="ml-1 h-4 w-4" />
                  </TMTooltip>
                </span>
              }
              placeholder="Enter API Key"
              errorText={
                !testRailsCred.key && testRailsCredTouched.key
                  ? INPUT_FIELD_ERROR
                  : ''
              }
            />
          </div>
          {connectionStatusMap[TESTRAIL] && (
            <TMAlerts
              accentBorder={false}
              show={!!connectionStatusMap[TESTRAIL]}
              modifier={
                connectionStatusMap[TESTRAIL] === 'success'
                  ? 'success'
                  : 'error'
              }
              title={
                connectionStatusMap[TESTRAIL] === 'success'
                  ? 'Connection was successful. Proceed to continue.'
                  : 'Connection was not successful. Try again.'
              }
              linkText={null}
            />
          )}
          <TermsAndConditions />
        </>
      )}
    </>
  );
};

export default TestRailImportForm;
