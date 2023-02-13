import React from 'react';
// import { useDispatch } from 'react-redux';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMAlerts,
  TMInputField,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';

import { TEST_RAILS } from '../const/importSteps';

// import { setTestRailsCred } from '../slices/importSlice';
import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const TestRailImportForm = () => {
  const {
    connectionStatusMap,
    // getUserEmail,
    handleInputFieldChange,
    testRailsCred,
    testRailsCredTouched
  } = useImport();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (getUserEmail)
  //     dispatch(setTestRailsCred({ key: 'email', value: getUserEmail }));
  // }, [dispatch, getUserEmail]);

  return (
    <div className="mt-12">
      <div className="flex justify-around">
        <div className="mr-6 w-full">
          <TMInputField
            placeholder="Enter Email Address"
            value={testRailsCred.email}
            id="email"
            onChange={handleInputFieldChange('email')}
            label="TestRail Email Address"
            errorText={
              !testRailsCred.email && testRailsCredTouched.email
                ? 'This field is required'
                : ''
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
                  <InfoOutlinedIcon fontSize="inherit" className="ml-2" />
                </TMTooltip>
              </>
            }
            placeholder="Enter Host Name"
            errorText={
              !testRailsCred.host && testRailsCredTouched.host
                ? 'This field is required'
                : ''
            }
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
              <TMTooltip
                size="xs"
                placementSide="right"
                theme="dark"
                content={
                  <>
                    <TMTooltipBody>
                      <p className="text-sm">
                        API Key is located at My Settings &gt; API Keys
                        <a
                          href={`${testRailsCred.host}index.php?/mysettings`}
                          className="mt-3 block cursor-pointer font-medium text-white underline"
                        >
                          Click here to get Token ID
                        </a>
                      </p>
                    </TMTooltipBody>
                  </>
                }
              >
                <InfoOutlinedIcon fontSize="inherit" className="ml-2" />
              </TMTooltip>
            </>
          }
          placeholder="Enter API Key"
          errorText={
            !testRailsCred.key && testRailsCredTouched.key
              ? 'This field is required'
              : ''
          }
        />
      </div>
      {connectionStatusMap[TEST_RAILS] && (
        <TMAlerts
          accentBorder={false}
          show={!!connectionStatusMap[TEST_RAILS]}
          modifier={connectionStatusMap[TEST_RAILS]}
          title={
            connectionStatusMap[TEST_RAILS] === 'success'
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
