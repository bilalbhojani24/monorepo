import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import { TMAlerts, TMInputField } from 'common/bifrostProxy';
import { bool } from 'prop-types';

import TermsAndConditions from './TermsAndConditions';
import useImport from './useImport';

const ZephyrImportForm = (props) => {
  const { jiraConfigured } = props;
  const { connectionStatus, handleInputFieldChange } = useImport();

  return (
    <div className="mt-12">
      {!jiraConfigured && (
        <>
          <div className="flex justify-around">
            <div className="mr-6 w-full">
              <TMInputField
                id="jira-host-name"
                onChange={handleInputFieldChange('host')}
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

ZephyrImportForm.propTypes = {
  jiraConfigured: bool,
};

ZephyrImportForm.defaultProps = {
  jiraConfigured: false,
};

export default ZephyrImportForm;
