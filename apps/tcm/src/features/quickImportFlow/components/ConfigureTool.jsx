import React from 'react';
import { TMBadge, TMButton, TMRadioGroup } from 'common/bifrostProxy';

import {
  IMPORT_FROM_TOOL,
  TEST_RAILS,
  UPLOAD_FILE,
  ZEPHYR
} from '../const/importSteps';

import ImportFooter from './ImportFooter';
import TestRailImportForm from './TestRailImportForm';
import UploadFile from './UploadFile';
import useImport from './useImport';
import ZephyrImportForm from './ZephyrImportForm';

const ConfigureTool = () => {
  const {
    jiraConfiguredForZephyr,
    isJiraConfiguredForZephyr,
    setTestManagementTool,
    currentTestManagementTool,
    handleRadioGroupChange,
    selectedRadioIdMap
  } = useImport();

  const testMgmtNameInDesc =
    currentTestManagementTool === 'testrails' ? "TestRail's" : 'Zephyr Scale';
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
    <div className="border-base-200 m-4 h-max w-4/5 rounded-md border-2 border-solid bg-white p-6">
      <div className="text-base-700 text-sm font-medium">
        Choose your existing tool
      </div>
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
                        isRounded
                        text="Recommended"
                        modifier="warn"
                        size="large"
                      />
                    </>
                  ),
                  description: `Enter ${testMgmtNameInDesc} credentials we'll import your data`
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
