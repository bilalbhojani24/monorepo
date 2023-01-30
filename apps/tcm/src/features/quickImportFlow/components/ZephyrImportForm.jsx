import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMAlerts, TMInputField } from 'common/bifrostProxy';
import { bool } from 'prop-types';

import { ZEPHYR } from '../const/importSteps';

import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const ZephyrImportForm = (props) => {
  const { jiraConfigured } = props;
  const { connectionStatusMap, handleInputFieldChange, zephyrCred } =
    useImport();

  return (
    <div className="mt-12">
      {!jiraConfigured && (
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
                    <span className="ml-1">
                      <InfoOutlinedIcon fontSize="inherit" />
                    </span>
                  </>
                }
                placeholder="https://abcd.atlassian.net"
              />
            </div>
            <div className="w-full">
              <TMInputField
                id="jira-api-token"
                onChange={handleInputFieldChange('jira_key')}
                value={zephyrCred.jira_key}
                label={
                  <>
                    JIRA API Token
                    <span className="ml-1">
                      <InfoOutlinedIcon fontSize="inherit" />
                    </span>
                  </>
                }
                placeholder="Enter JIRA API Token"
              />
            </div>
          </div>
          <div className="mt-6 mb-4 flex justify-around">
            <div className="mr-6 w-full">
              <TMInputField
                id="jira-email"
                onChange={handleInputFieldChange('email')}
                value={zephyrCred.email}
                label={
                  <>
                    JIRA Email Address
                    <span className="ml-1">
                      <InfoOutlinedIcon fontSize="inherit" />
                    </span>
                  </>
                }
                placeholder="Enter JIRA Email Address"
              />
            </div>
            <div className="w-full">
              <TMInputField
                id="zephyr-api-token"
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
              />
            </div>
          </div>
        </>
      )}
      {jiraConfigured && <>Jira Is Configured</>}
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
