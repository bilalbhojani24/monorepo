import React, { useState } from 'react';
import { TMBadge, TMButton, TMRadioGroup } from 'common/bifrostProxy';

import { IMPORT_FROM_TOOL, UPLOAD_FILE } from '../const/importSteps';

import ImportFooter from './ImportFooter';
import TestRailImportForm from './TestRailImportForm';
import useImport from './useImport';
import ZephyrImportForm from './ZephyrImportForm';

const ConfigureTool = () => {
  const [selectedRadioId, setSelectedRadioId] = useState('');

  const {
    jiraConfigured,
    isJiraConfiguredForZephyr,
    setTestManagementTool,
    currentTestManagementTool,
  } = useImport();

  const handleButtonClick = (text) => () => {
    if (text === 'zephyr') isJiraConfiguredForZephyr();
    setTestManagementTool(text);
  };
  const handleRadioGroupChange = (_, id) => {
    setSelectedRadioId(id);
  };

  const getForm = () => {
    if (currentTestManagementTool === 'testrails') {
      if (selectedRadioId === IMPORT_FROM_TOOL) return <TestRailImportForm />;
      if (selectedRadioId === UPLOAD_FILE) return 'Upload';
      return 'Nothing';
    }
    if (currentTestManagementTool === 'zephyr') {
      if (selectedRadioId === IMPORT_FROM_TOOL)
        return <ZephyrImportForm jiraConfigured={jiraConfigured} />;
      if (selectedRadioId === UPLOAD_FILE) return 'Upload';
      return 'Nothing';
    }
    return null;
  };

  return (
    <div className="border-base-200 m-4 flex flex-1 flex-col items-stretch rounded-md border-2 border-solid p-6">
      <div className="text-lg">Choose your existing tool</div>
      <div className="mt-2 flex">
        <div className="mr-3">
          <TMButton
            colors={
              currentTestManagementTool === 'testrails' ? 'brand' : 'white'
            }
            variant={
              currentTestManagementTool === 'testrails'
                ? 'secondary'
                : 'primary'
            }
            size="extra-large"
            onClick={handleButtonClick('testrails')}
          >
            TestRail
          </TMButton>
        </div>
        <div className="mr-3">
          <TMButton
            colors={currentTestManagementTool === 'zephyr' ? 'brand' : 'white'}
            variant={
              currentTestManagementTool === 'zephyr' ? 'secondary' : 'primary'
            }
            size="extra-large"
            onClick={handleButtonClick('zephyr')}
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
              onChange={handleRadioGroupChange}
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
                  description: `Enter ${currentTestManagementTool} credentials we'll import your data`,
                },
                {
                  id: 'upload-file',
                  name: 'Upload file',
                  description: `Upload ${currentTestManagementTool} XML file with test case data`,
                },
              ]}
            />
          </div>
        </div>
      )}
      {getForm()}
      {currentTestManagementTool && selectedRadioId === IMPORT_FROM_TOOL && (
        <div className="flex justify-end">
          <ImportFooter />
        </div>
      )}
    </div>
  );
};

export default ConfigureTool;
