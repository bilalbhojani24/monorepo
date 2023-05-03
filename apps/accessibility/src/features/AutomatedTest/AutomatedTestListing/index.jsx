import React from 'react';
import {
  Button,
  InputField,
  InputGroupAddOn,
  MdSearch
} from '@browserstack/bifrost';

import AutomatedTestList from './AutomatedTestList';
import useAutomatedTestListing from './useAutomatedTestListing';

export default function AutomatedTestListing() {
  const { buildListing, onInputValueChange } = useAutomatedTestListing();

  return (
    <div className="bg-white">
      <div className="bg-base-50 px-6 pb-4 pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-base-900 mb-2 text-2xl font-bold">
              Automated tests
            </h1>
            <p className="text-base-500 mb-4 text-sm">
              Automated accessibility testing of your test cases with the
              BrowserStack SDK.
            </p>
          </div>
          <Button colors="white">View documentation</Button>
        </div>
        <div>
          <InputField
            id="search-report"
            addOnBeforeInline={
              <InputGroupAddOn inline>
                <MdSearch className="h-5 w-5" />
              </InputGroupAddOn>
            }
            placeholder="Search builds by name..."
            onChange={onInputValueChange}
            wrapperClassName="mr-4 w-80"
          />
        </div>
      </div>
      <div>
        {buildListing.length > 0 && (
          <AutomatedTestList buildList={buildListing} />
        )}
      </div>
    </div>
  );
}
