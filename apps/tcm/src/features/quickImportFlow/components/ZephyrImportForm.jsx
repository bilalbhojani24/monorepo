import React from 'react';
import { CheckCircleIcon } from '@browserstack/bifrost';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMAlerts,
  TMInputField,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';
import { bool } from 'prop-types';

import { ZEPHYR } from '../const/importSteps';

import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const ZephyrImportForm = (props) => {
  const { jiraConfigured } = props;
  const {
    connectionStatusMap,
    handleInputFieldChange,
    zephyrCred,
    zephyrCredTouched
  } = useImport();

  return (
    <div className="mt-12">
      {jiraConfigured && (
        <div className="mb-2 flex items-center">
          <CheckCircleIcon className="text-success-500 mr-1 h-5 w-5" />
          We found your Host Name as per your previous JIRA integration.
        </div>
      )}
      <>
        <div className="flex justify-around">
          <div className="mr-6 w-full">
            <TMInputField
              id="jira-host-name"
              onChange={handleInputFieldChange('host')}
              value={zephyrCred.host}
              label={
                <>
                  JIRA Host Name
                  <TMTooltip
                    size="xs"
                    placementSide="right"
                    theme="dark"
                    content={
                      <>
                        <TMTooltipBody>
                          <p className="text-sm">
                            Host Name is your JIRA
                            <div>account where Zephyr is linked.</div>
                            <div>Eg: https://abcd.atlassian.net</div>
                          </p>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    <InfoOutlinedIcon fontSize="inherit" className="ml-2" />
                  </TMTooltip>
                </>
              }
              placeholder="https://abcd.atlassian.net"
              errorText={
                !zephyrCred.host && zephyrCredTouched.host
                  ? 'This field is required'
                  : ''
              }
            />
          </div>
          <div className="w-full">
            <TMInputField
              id="jira-api-token"
              type="password"
              onChange={handleInputFieldChange('jira_key')}
              value={zephyrCred.jira_key}
              label={
                <>
                  JIRA API Token
                  <TMTooltip
                    size="xs"
                    placementSide="right"
                    theme="dark"
                    content={
                      <>
                        <TMTooltipBody>
                          <p className="text-sm">
                            API Token can be located here:
                            <div className="mt-3 cursor-pointer font-medium text-white underline">
                              Click here to get API Token
                            </div>
                          </p>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    <InfoOutlinedIcon fontSize="inherit" className="ml-2" />
                  </TMTooltip>
                </>
              }
              placeholder="Enter JIRA API Token"
              errorText={
                !zephyrCred.jira_key && zephyrCredTouched.jira_key
                  ? 'This field is required'
                  : ''
              }
            />
          </div>
        </div>
        <div className="mt-6 mb-4 flex justify-around">
          <div className="mr-6 w-full">
            <TMInputField
              id="jira-email"
              onChange={handleInputFieldChange('email')}
              value={zephyrCred.email}
              label={<>JIRA Email Address</>}
              placeholder="Enter JIRA Email Address"
              errorText={
                !zephyrCred.email && zephyrCredTouched.email
                  ? 'This field is required'
                  : ''
              }
            />
          </div>
          <div className="w-full">
            <TMInputField
              id="zephyr-api-token"
              type="password"
              onChange={handleInputFieldChange('zephyr_key')}
              value={zephyrCred.zephyr_key}
              label={
                <>
                  Zephyr API Token
                  <span className="ml-1">
                    <InfoOutlinedIcon fontSize="inherit" />
                  </span>
                </>
              }
              placeholder="Enter Zephyr API Token"
              errorText={
                !zephyrCred.zephyr_key && zephyrCredTouched.zephyr_key
                  ? 'This field is required'
                  : ''
              }
            />
          </div>
        </div>
      </>
      {connectionStatusMap[ZEPHYR] && (
        <TMAlerts
          accentBorder={false}
          show={!!connectionStatusMap[ZEPHYR]}
          modifier={connectionStatusMap[ZEPHYR]}
          title={
            connectionStatusMap[ZEPHYR] === 'success'
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

ZephyrImportForm.propTypes = {
  jiraConfigured: bool
};

ZephyrImportForm.defaultProps = {
  jiraConfigured: false
};

export default ZephyrImportForm;
