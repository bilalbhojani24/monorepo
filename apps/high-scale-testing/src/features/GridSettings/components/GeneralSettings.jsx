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
      title="Settings updated!"
      handleClose={(toastData) => {
        notify.remove(toastData.id);
      }}
      headerIcon={<CheckCircleIcon className="text-success-400 h-6 w-6" />}
    />
  );

  const {
    currentConcurrencyValue,
    inputChangeHandler,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler
  } = useGeneralSettings(notifactionComponent);

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
          <p className="text-sm font-medium">Concurrency</p>
          <p className="text-base-500 text-sm">
            Set the number of browsers that would spawn concurrently. It is set
            at 50 by default. You can adjust the concurrency as per your needs.
          </p>

          <div className="mt-3 w-32">
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
