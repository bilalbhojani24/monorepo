import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TMCheckBox, TMInputField, TMSelectMenu } from 'common/bifrostProxy';

import { getCSVConfigurations } from '../../../api/importCSV.api';
import { setCSVFormData } from '../slices/importCSVSlice';

import useImportCSV from './useImportCSV';

const CSVForm = () => {
  const dispatch = useDispatch();
  const [configurations, setConfigurations] = useState();

  const { csvFormData, handleCSVFieldChange } = useImportCSV();

  useEffect(() => {
    getCSVConfigurations().then((data) => {
      setConfigurations({
        encodings: data.encodings.map((item) => ({ label: item, value: item })),
        separators: data.separators.map((item) => ({
          label: item,
          value: item
        }))
      });
      Object.keys(csvFormData).forEach((key) => {
        if (key === 'row') dispatch(setCSVFormData({ key, value: 1 }));
        else if (key === 'encodings') {
          dispatch(
            setCSVFormData({
              key,
              value: { label: data[key][2], value: data[key][2] }
            })
          );
        } else if (key === 'separators') {
          dispatch(
            setCSVFormData({
              key,
              value: { label: data[key][0], value: data[key][0] }
            })
          );
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <div className="mt-6 flex justify-between">
        <div className="flex-1">
          <TMSelectMenu
            checkPosition="right"
            label="CSV Separator"
            value={csvFormData.separators}
            placeholder={null}
            options={configurations?.separators || []}
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
            options={configurations?.encodings || []}
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
          description: 'Select if 1 first row first has column name'
        }}
        onChange={handleCSVFieldChange('firstRowIsHeader')}
      />
    </>
  );
};

export default CSVForm;
