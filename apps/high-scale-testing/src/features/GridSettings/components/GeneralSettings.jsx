import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputField } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { DEFAULT_GRID_CONCURRENCY } from 'constants/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const GeneralSettings = () => {
  // All Store variables:
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);

  const currentConcurrencyValue =
    gridData.concurrency || DEFAULT_GRID_CONCURRENCY;

  const [concurrencyValue, setConcurrencyValue] = useState(
    currentConcurrencyValue
  );

  const inputChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setConcurrencyValue(newValue);
  };

  const updateGridGeneralSettings = (settingsObj) => {
    updateSettings(userDetails.id, 'grid', 'general', settingsObj).then((d) => {
      console.log('d:', d);
      setIsSaveButtonDisabled(true);
      setIsSavingInProgress(false);
    });
  };

  const saveBtnClickhandler = () => {
    setIsSavingInProgress(true);
    const settingsObj = {
      concurrency: concurrencyValue
    };
    updateGridGeneralSettings(settingsObj);
  };

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="h-[calc(100vh-64px-134px-48px-62px)] overflow-auto p-6">
        <p className="text-base-900 text-lg font-medium">General Settings</p>
        <p className="text-base-500 text-sm">
          Configure the general settings for this Grid.
        </p>

        {/* --- --- Concurrency --- --- */}
        <div className="pt-6">
          <p className="font-medium">Concurrency</p>
          <p className="text-base-500 text-sm">
            Set the number of browsers that would spawn concurrently. It is set
            at 50 by default. You can adjust the concurrency as per your needs.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              disabled={isSavingInProgress}
              id="test-id"
              onChange={inputChangeHandler}
              onKeyDown={null}
              defaultValue={currentConcurrencyValue}
              type="number"
            />
          </div>
        </div>
        {/* --- X --- Concurrency --- X --- */}
      </div>
      <div className="bg-base-50 flex flex-row-reverse px-6 py-3">
        <Button
          disabled={isSaveButtonDisabled}
          loading={isSavingInProgress}
          onClick={saveBtnClickhandler}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default GeneralSettings;
