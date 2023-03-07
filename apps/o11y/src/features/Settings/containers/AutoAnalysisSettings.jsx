import React from 'react';
import {
  O11yButton,
  O11yInputAddOnTexts,
  O11ySwitch
} from 'common/bifrostProxy';

export default function AutoAnalysisSettings() {
  return (
    <div className="border-base-200 max-h-full flex-1 overflow-auto rounded-lg border bg-white shadow">
      <section className="border-b-base-200 border-b p-6">
        <h2 className="text-lg font-medium leading-6">Auto Failure Analysis</h2>
        <p className="text-base-500 mt-1 text-sm leading-5">
          Automatic analysis of failed tests depends on manual tagging with
          failure categories of tests for few initial runs, based on which it
          starts to automatically identify future tests that fail with similar
          issues.
        </p>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Automatic failure category detection
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Enable to auto-identify failure categories for tests with similar
            failure patterns. If disabled, all tests will be tagged as “To be
            investigated” and require manual categorization.
          </p>
          <O11ySwitch />
        </div>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Automatic unique error detection
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Enable to auto detect unique errors that occurred across various
            tests in a build resulting in test failures. This analysis helps in
            consolidating multiple common cause test failures.
          </p>
          <O11ySwitch />
        </div>
      </section>
      <section className="p-6">
        <h2 className="text-lg font-medium leading-6">Threshold</h2>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Threshold percentage match for automatic failure analysis (in minutes)
        </h3>
        <p className="text-base-500 mt-1 text-sm leading-5">
          Set a threshold percentage that guides the automatic failure category
          detection algorithms to ensure that tagging of failure category is
          accurate. It is set at 95% by default. You can adjust this number
          based on the accuracy of test tagging.
        </p>
        <div className="mt-3 max-w-xs">
          <O11yInputAddOnTexts
            id="auto-failure-threshold"
            isAddOnInline
            trailingAddOnText="minutes"
          />
        </div>
      </section>
      <div className="bg-base-50 sticky bottom-0 flex justify-end py-3 px-6">
        <O11yButton disabled>Save Changes</O11yButton>
      </div>
    </div>
  );
}
