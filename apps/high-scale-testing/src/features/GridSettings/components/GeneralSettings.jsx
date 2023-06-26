import React from 'react';
import {
  Button,
  CheckCircleIcon,
  InputField,
  Notifications,
  notify
} from '@browserstack/bifrost';

import useGeneralSettings from './useGeneralSettings';

const GeneralSettings = () => {
  const notifactionComponent = (
    <Notifications
      description="Settings were updated successfully"
      title="Settings updated!"
      handleClose={(toastData) => {
        notify.remove(toastData.id);
      }}
      headerIcon={<CheckCircleIcon className="h-6 w-6 text-success-400" />}
    />
  );

  const {
    concurrencyErrorText,
    currentConcurrencyValue,
    inputChangeHandler,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler
  } = useGeneralSettings(notifactionComponent);

  return (
    <>
      <div className="overflow-auto p-6">
        <p className="text-lg font-medium text-base-900">General Settings</p>
        <p className="text-sm text-base-500">
          Configure the general settings for this Grid.
        </p>

        {/* --- --- Concurrency --- --- */}
        <div className="pt-6">
          <p className="text-sm font-medium">Concurrency</p>
          <p className="text-sm text-base-500">
            Set the number of browsers that would spawn concurrently. It is set
            at 50 by default. You can adjust the concurrency as per your needs.
          </p>

          <div className="mt-3 w-32">
            <InputField
              disabled={isSavingInProgress}
              errorText={concurrencyErrorText}
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
      <div className="flex flex-row-reverse bg-base-50 px-6 py-3">
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
