import React from 'react';
import { Button, InputField } from '@browserstack/bifrost';

const GeneralSettings = () => (
  <>
    {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
    <div className="h-[calc(100vh-64px-134px-48px-62px)] p-6">
      <p className="text-base-900 text-lg font-medium">General Settings</p>
      <p className="text-base-500 text-sm">
        Configure the general settings for this Grid.
      </p>

      {/* --- --- Concurrency --- --- */}
      <div className="pt-6">
        <p className="font-medium">Concurrency</p>
        <p className="text-base-500 text-sm">
          Set the number of browsers that would spawn concurrently. It is set at
          50 by default. You can adjust the concurrency as per your needs.
        </p>

        <div className="mt-3 max-w-xs">
          <InputField
            id="test-id"
            onBlur={null}
            onChange={null}
            onFocus={null}
            onKeyDown={null}
            placeholder="50"
          />
        </div>
      </div>
      {/* --- X --- Concurrency --- X --- */}
    </div>
    <div className="bg-base-50 flex flex-row-reverse px-6 py-3">
      <Button> Save Changes </Button>
    </div>
  </>
);

export default GeneralSettings;
