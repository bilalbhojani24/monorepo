import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TMBadge, TMButton, TMRadioGroup } from 'bifrostProxy';

import TestRailImportForm from './TestRailImportForm';

const ConfigureTool = () => {
  const [buttonText, setButtonText] = useState('');
  const [selectedRadioId, setSelectedRadioId] = useState('');

  const handleButtonClick = (text) => () => {
    setButtonText(text);
  };
  const handleRadioGroupChange = (e, id) => {
    setSelectedRadioId(id);
  };

  const getForm = () => {
    if (selectedRadioId === 'import-from-tool') return <TestRailImportForm />;
    if (selectedRadioId === 'upload-file') return 'Upload';
    return 'Nothing';
  };

  return (
    <div className="m-4 flex flex-1 flex-col items-stretch rounded-md border-2 border-solid border-base-200 p-6">
      <div className="text-lg">Choose your existing tool</div>
      <div className="mt-2 flex">
        <div className="mr-3">
          <TMButton
            colors={buttonText === 'testrails' ? 'brand' : 'white'}
            variant={buttonText === 'testrails' ? 'secondary' : 'primary'}
            size="extra-large"
            onClick={handleButtonClick('testrails')}
          >
            TestRail
          </TMButton>
        </div>
        <div className="mr-3">
          <TMButton
            colors={buttonText === 'zephyr' ? 'brand' : 'white'}
            variant={buttonText === 'zephyr' ? 'secondary' : 'primary'}
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
                    <TMBadge text="Recommended" modifier="warn" size="large" />
                  </>
                ),
                description: `Enter credentials we'll import your data`,
              },
              {
                id: 'upload-file',
                name: 'Upload file',
                description: `Upload TestRail’s XML file with test case data`,
              },
            ]}
          />
        </div>
      </div>
      {getForm()}
    </div>
  );
};

export default ConfigureTool;
