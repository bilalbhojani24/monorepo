import React from 'react';
import { O11yButton, O11yInputAddOnTexts } from 'common/bifrostProxy';

export default function GeneralSettings() {
  return (
    <div className="border-base-200 max-h-full flex-1 overflow-auto rounded-lg border bg-white shadow">
      <div className="p-6">
        <p className="text-lg font-medium leading-6">Inactivity timeout</p>
        <p className="text-base-500 mt-1 text-sm font-normal leading-5">
          BrowserStack Test Observability registers activities in your test runs
          and represents it. Set an inactivity timeout to force-terminate
          running builds on account of not receiving events from your test
          framework.
        </p>
        <p className="mt-6 text-sm font-medium leading-5">
          Timeout for build (in minutes)
        </p>
        <p className="text-base-500 mt-1 mb-3 text-sm font-normal leading-5">
          Set a larger build timeout if you have non-test related activities
          consuming a considerable amount of time as part of your build.
        </p>
        <div className="max-w-xs">
          <O11yInputAddOnTexts
            id="general-build-timeout"
            isAddOnInline
            trailingAddOnText="minutes"
          />
        </div>
      </div>
      <div className="bg-base-50 sticky bottom-0 flex justify-end py-3 px-6">
        <O11yButton disabled>Save Changes</O11yButton>
      </div>
    </div>
  );
}
