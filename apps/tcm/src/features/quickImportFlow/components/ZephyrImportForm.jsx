import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  TMAlerts,
  TMInputField,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';
import { bool } from 'prop-types';

import { INPUT_FIELD_ERROR } from '../const/importConst';
import { ZEPHYR } from '../const/importSteps';

import TermsAndConditions from './TermsAndConditions';
import useConfigureTool from './useConfigureTool';

const ZephyrImportForm = (props) => {
  const { jiraConfigured } = props;
  const {
    connectionStatusMap,
    handleInputFieldChange,
    configureToolProceed,
    zephyrCred,
    zephyrCredTouched,
    loggedInScreen
  } = useConfigureTool();

  return (
    <>
      {jiraConfigured && !configureToolProceed && (
        <div className="mb-6">
          <TMAlerts
            accentBorder={false}
            linkText={null}
            modifier="success"
            title="We found JIRA Host Name as per your existing JIRA integration."
          />
        </div>
      )}
      <>
        <div
          className={twClassNames('flex', {
            'justify-around': !loggedInScreen
          })}
        >
          <div
            className={twClassNames('mr-6', {
              'basis-1/2': loggedInScreen,
              'w-full': !loggedInScreen
            })}
          >
            <TMInputField
              id="jira-host-name"
              onChange={handleInputFieldChange('host')}
              value={zephyrCred.host}
              readonly={loggedInScreen}
              label={
                <span className="flex items-center">
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
                    <MdInfoOutline className="ml-1 h-4 w-4" />
                  </TMTooltip>
                </span>
              }
              placeholder="https://abcd.atlassian.net"
              errorText={
                !zephyrCred.host && zephyrCredTouched.host
                  ? INPUT_FIELD_ERROR
                  : ''
              }
            />
          </div>
          {!loggedInScreen && (
            <div className="w-full">
              <TMInputField
                id="jira-api-token"
                type="password"
                onChange={handleInputFieldChange('jira_key')}
                value={zephyrCred.jira_key}
                label={
                  <span className="flex items-center">
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
                              <br />
                              <a
                                href="https://id.atlassian.com/manage-profile/security/api-tokens"
                                className="mt-3 block cursor-pointer font-medium text-white underline"
                                target="new"
                              >
                                Click here to get API Token
                              </a>
                            </p>
                          </TMTooltipBody>
                        </>
                      }
                    >
                      <MdInfoOutline className="ml-1 h-4 w-4" />
                    </TMTooltip>
                  </span>
                }
                placeholder="Enter JIRA API Token"
                errorText={
                  !zephyrCred.jira_key && zephyrCredTouched.jira_key
                    ? INPUT_FIELD_ERROR
                    : ''
                }
              />
            </div>
          )}
        </div>
        {!loggedInScreen && (
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
                    ? INPUT_FIELD_ERROR
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
                  <span className="flex items-center">
                    Zephyr Scale API Access Token
                    <TMTooltip
                      size="xs"
                      placementSide="right"
                      theme="dark"
                      content={
                        <TMTooltipBody>
                          <p className="text-sm">
                            Get Zephyr Scale API Access Token using the link
                            below: <br />
                            <a
                              href="https://support.smartbear.com/zephyr-scale-cloud/docs/rest-api/generating-api-access-tokens.html"
                              className="mt-3 block cursor-pointer font-medium text-white underline"
                              target="new"
                            >
                              Zephyr Scale API Access Token
                            </a>
                          </p>
                        </TMTooltipBody>
                      }
                    >
                      <MdInfoOutline className="ml-1 h-4 w-4" />
                    </TMTooltip>
                  </span>
                }
                placeholder="Enter Zephyr Scale API Access Token"
                errorText={
                  !zephyrCred.zephyr_key && zephyrCredTouched.zephyr_key
                    ? INPUT_FIELD_ERROR
                    : ''
                }
              />
            </div>
          </div>
        )}
      </>
      {!loggedInScreen && (
        <>
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
        </>
      )}
    </>
  );
};

ZephyrImportForm.propTypes = {
  jiraConfigured: bool
};

ZephyrImportForm.defaultProps = {
  jiraConfigured: false
};

export default ZephyrImportForm;
