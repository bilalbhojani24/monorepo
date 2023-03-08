import React from 'react';
import { O11yButton, O11ySwitch } from 'common/bifrostProxy';

export default function ReRunSettings() {
  return (
    <div className="border-base-200 max-h-full flex-1 overflow-auto rounded-lg border bg-white shadow">
      <section className="p-6">
        <h2 className="text-lg font-medium leading-6">
          Re-run your builds using BrowserStack
        </h2>
        <p className="text-base-500 mt-1 text-sm leading-5">
          BrowserStack lets you re-trigger your CI builds directly from the
          dashboard, or merge build runs automatically through either of these
          modes.
        </p>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Re-run from the command line
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Automatically merge test data from re-run builds by setting
            &quot;BROWSERSTACK_RERUN&quot; env var to &quot;true&quot; in your
            runner environment before the start of the re-triggered build run.
          </p>
          <O11ySwitch />
        </div>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Re-run from the Dashboard
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Enable to add the functionality of triggering re-runs of selective
            tests on the CI, from the dashboard. Ensure that you have configured
            the CI integration for CI re-runs.
          </p>
          <O11ySwitch />
        </div>
      </section>
      <div className="bg-base-50 sticky bottom-0 flex justify-end py-3 px-6">
        <O11yButton disabled>Save Changes</O11yButton>
      </div>
    </div>
  );
}
