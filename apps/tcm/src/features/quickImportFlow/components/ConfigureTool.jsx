import React from 'react';
import { UserIcon } from '@browserstack/bifrost';
import {
  TMAlerts,
  TMBadge,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMRadioGroup
} from 'common/bifrostProxy';

import {
  IMPORT_FROM_TOOL,
  TEST_RAILS,
  UPLOAD_FILE,
  ZEPHYR
} from '../const/importSteps';

import ImportFooter from './ImportFooter';
import TestRailImportForm from './TestRailImportForm';
import UploadFile from './UploadFile';
import useConfigureTool from './useConfigureTool';
import ZephyrImportForm from './ZephyrImportForm';

const ConfigureTool = () => {
  const {
    jiraConfiguredForZephyr,
    isJiraConfiguredForZephyr,
    setTestManagementTool,
    currentTestManagementTool,
    handleRadioGroupChange,
    selectedRadioIdMap,
    handleConnectNewAccount,
    loggedInScreen,
    showConnectNewAccountModal,
    setShowConnectNewAccountModal,
    handleDisconnectAccount,
    currentEmail
  } = useConfigureTool();

  const testMgmtNameInDesc =
    currentTestManagementTool === 'testrails' ? 'TestRail' : 'Zephyr Scale';
  const handleButtonClick = (text) => () => {
    if (text === ZEPHYR) isJiraConfiguredForZephyr();
    setTestManagementTool(text);
  };

  const getForm = () => {
    if (selectedRadioIdMap[currentTestManagementTool] === IMPORT_FROM_TOOL) {
      return currentTestManagementTool === TEST_RAILS ? (
        <TestRailImportForm />
      ) : (
        <ZephyrImportForm jiraConfigured={jiraConfiguredForZephyr} />
      );
    }
    if (selectedRadioIdMap[currentTestManagementTool] === UPLOAD_FILE) {
      return <UploadFile />;
    }
    return null;
  };

  return (
    <div className="border-base-200 m-4 h-max w-3/4 max-w-7xl rounded-md border-2 border-solid bg-white">
      <div className="p-6">
        <div className="text-base-700 text-sm font-medium">
          Select your preferred tool
        </div>
        <div className="mt-2 flex">
          <div className="mr-3">
            <TMButton
              colors={
                currentTestManagementTool === TEST_RAILS ? 'brand' : 'white'
              }
              variant={
                currentTestManagementTool === TEST_RAILS
                  ? 'secondary'
                  : 'primary'
              }
              size="large"
              onClick={handleButtonClick(TEST_RAILS)}
            >
              TestRail
            </TMButton>
          </div>
          <div className="mr-3">
            <TMButton
              colors={currentTestManagementTool === ZEPHYR ? 'brand' : 'white'}
              variant={
                currentTestManagementTool === ZEPHYR ? 'secondary' : 'primary'
              }
              size="large"
              onClick={handleButtonClick(ZEPHYR)}
            >
              Zephyr Scale
            </TMButton>
          </div>
          {/* <div className="mr-3">
          <TMButton
            colors={buttonText === 'xray' ? 'brand' : 'white'}
            variant={buttonText === 'xray' ? 'secondary' : 'primary'}
            size="extra-large"
            onClick={handleButtonClick('xray')}
          >
            XRay
          </TMButton>
        </div>
        <div>
          <TMButton
            colors={buttonText === 'other' ? 'brand' : 'white'}
            variant={buttonText === 'other' ? 'secondary' : 'primary'}
            size="extra-large"
            onClick={handleButtonClick('other')}
          >
            Other
          </TMButton>
        </div> */}
        </div>
        {currentTestManagementTool && (
          <div className="mt-6">
            <div className="text-sm font-normal">Choose import Type:</div>
            <div className="mt-3">
              <TMRadioGroup
                direction="horizontal"
                onChange={handleRadioGroupChange(currentTestManagementTool)}
                selectedOption={{
                  id: selectedRadioIdMap[currentTestManagementTool]
                }}
                options={[
                  {
                    id: 'import-from-tool',
                    name: (
                      <>
                        <span className="mr-1">Import data from tool</span>
                        <TMBadge
                          wrapperClassName="hover:bg-attention-100"
                          isRounded
                          text="Recommended"
                          modifier="warn"
                          size="large"
                        />
                      </>
                    ),
                    description: `Enter ${testMgmtNameInDesc} credentials, we'll import your data`
                  },
                  {
                    id: 'upload-file',
                    name: 'Upload file',
                    description: `Upload ${testMgmtNameInDesc} XML file with test case data`
                  }
                ]}
              />
            </div>
            <div className="border-base-200 my-6 border text-sm font-normal" />
          </div>
        )}
        {getForm()}
        {loggedInScreen && (
          <div className="mt-4">
            <TMAlerts
              description={`Successfully logged in with `}
              modifier="primary"
              accentBorder={false}
              linkText="Connect New Account"
              handleLinkClick={handleConnectNewAccount}
            />
          </div>
        )}
      </div>
      {currentTestManagementTool &&
        selectedRadioIdMap[currentTestManagementTool] === IMPORT_FROM_TOOL && (
          <div className="bg-base-50 flex justify-end px-4 py-3">
            <ImportFooter />
          </div>
        )}

      <TMModal show={showConnectNewAccountModal}>
        <TMModalBody className="py-5">
          <div>
            <div className="bg-brand-500 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <UserIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                as="h3"
                className="text-base-900 text-lg font-medium leading-6"
              >
                Connect New Account
              </h3>
              <div className="text-base-500 mx-auto mt-2 text-sm">
                <p>{`You are currently logged with ${currentEmail}`}</p>
                <p>
                  {' '}
                  If you continue your previously fetched projects will be
                  removed
                </p>
              </div>
            </div>
          </div>
        </TMModalBody>
        <TMModalFooter>
          <TMButton
            fullWidth
            colors="white"
            onClick={() => setShowConnectNewAccountModal(false)}
          >
            Cancel
          </TMButton>
          <TMButton fullWidth colors="brand" onClick={handleDisconnectAccount}>
            Disconnect Account
          </TMButton>
        </TMModalFooter>
      </TMModal>
    </div>
  );
};

export default ConfigureTool;
