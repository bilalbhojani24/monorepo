import React from 'react';
import { TMCheckBox, TMInputField, TMSelectMenu } from 'common/bifrostProxy';

import useImportCSV from './useImportCSV';

const CSVForm = () => {
  const { allEncodings, allSeparators, csvFormData, handleCSVFieldChange } =
    useImportCSV();

  return (
    <>
      <div className="my-6 flex justify-between">
        <div className="flex-1">
          <TMSelectMenu
            checkPosition="right"
            label="CSV Separator"
            value={csvFormData.separators}
            placeholder={null}
            options={allSeparators}
            onChange={handleCSVFieldChange('separators')}
          />
        </div>
        <div className="mx-6 flex-1">
          <TMInputField
            id="first-row-input"
            value={csvFormData.row}
            type="number"
            label="First Row"
            onChange={handleCSVFieldChange('row')}
          />
        </div>
        <div className="flex-1">
          <TMSelectMenu
            checkPosition="right"
            label="File Encoding"
            placeholder={null}
            value={csvFormData.encodings}
            options={allEncodings}
            onChange={handleCSVFieldChange('encodings')}
          />
        </div>
      </div>
      <TMCheckBox
        border={false}
        checked={csvFormData?.firstRowIsHeader}
        description="block"
        data={{
          label: 'First row has column names',
          description: 'Select if first row has column name'
        }}
        onChange={handleCSVFieldChange('firstRowIsHeader')}
      />
    </>
  );
};

export default CSVForm;
