import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { retryImport } from 'api/import.api';
import { TMBadge, TMButton, TMRadioGroup } from 'common/bifrostProxy';

import {
  IMPORT_FROM_TOOL,
  TEST_RAILS,
  UPLOAD_FILE,
  ZEPHYR
} from '../const/importSteps';

import ImportFooter from './ImportFooter';
import TestRailImportForm from './TestRailImportForm';
import useImport from './useImport';
import ZephyrImportForm from './ZephyrImportForm';

const ConfigureTool = () => {
  const { state } = useLocation();
  const {
    jiraConfigured,
    isJiraConfiguredForZephyr,
    setTestManagementTool,
    currentTestManagementTool,
    handleRadioGroupChange,
    selectedRadioIdMap
  } = useImport();

  const handleButtonClick = (text) => () => {
    if (text === ZEPHYR) isJiraConfiguredForZephyr();
    setTestManagementTool(text);
  };

  const getForm = () => {
    if (selectedRadioIdMap[currentTestManagementTool] === IMPORT_FROM_TOOL) {
      return currentTestManagementTool === TEST_RAILS ? (
        <TestRailImportForm />
      ) : (
        <ZephyrImportForm jiraConfigured={jiraConfigured} />
      );
    }
    if (selectedRadioIdMap[currentTestManagementTool] === UPLOAD_FILE) {
      return 'Upload';
    }
    return null;
  };

  useEffect(() => {
    // console.log('hello from use effect', state?.tool);
    // let myTool;
    // if (state?.tool === 'testrail_quick') myTool = 'testrail';
    // else if (state?.tool === 'zephyr_quick') myTool = 'zephyr';
    // console.log('use effect me ', state?.importId, myTool);
    // if (state?.importId && myTool) {
    //   retryImport(state?.importId, myTool).then((data) => {
    //     console.log('inside retry', data);
    //   });
    // }
  }, [state?.importId, state?.tool]);

  return (
    <div className="border-base-200 m-4 flex flex-1 flex-col items-stretch rounded-md border-2 border-solid p-6">
      <div className="text-lg">Choose your existing tool</div>
      <div className="mt-2 flex">
        <div className="mr-3">
          <TMButton
            colors={
              currentTestManagementTool === TEST_RAILS ? 'brand' : 'white'
            }
            variant={
              currentTestManagementTool === TEST_RAILS ? 'secondary' : 'primary'
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
            Zephyr
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
          <div className="text-lg">Choose import Type:</div>
          <div className="mt-3">
            <TMRadioGroup
              direction="horizontal"
              onChange={handleRadioGroupChange(currentTestManagementTool)}
              defaultSelectedOption={{
                id: selectedRadioIdMap[currentTestManagementTool]
              }}
              options={[
                {
                  id: 'import-from-tool',
                  name: (
                    <>
                      <span className="mr-1">Import data from tool</span>
                      <TMBadge
                        text="Recommended"
                        modifier="warn"
                        size="large"
                      />
                    </>
                  ),
                  description: `Enter ${currentTestManagementTool} credentials we'll import your data`
                },
                {
                  id: 'upload-file',
                  name: 'Upload file',
                  description: `Upload ${currentTestManagementTool} XML file with test case data`
                }
              ]}
            />
          </div>
        </div>
      )}
      {getForm()}
      {currentTestManagementTool &&
        selectedRadioIdMap[currentTestManagementTool] === IMPORT_FROM_TOOL && (
          <div className="flex justify-end">
            <ImportFooter />
          </div>
        )}
    </div>
  );
};

export default ConfigureTool;
