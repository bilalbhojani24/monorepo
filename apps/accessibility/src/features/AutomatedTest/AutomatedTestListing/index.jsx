import React from 'react';
import {
  Button,
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  InputField,
  InputGroupAddOn,
  MdSearch
} from '@browserstack/bifrost';
import ColdStart from 'common/ColdStart';
import { logEvent } from 'utils/logEvent';

import AutomatedTestList from './AutomatedTestList';
import useAutomatedTestListing from './useAutomatedTestListing';

export default function AutomatedTestListing() {
  const {
    buildListing,
    onInputValueChange,
    onComboboxValueChange,
    comboboxItems,
    handleSelectChange,
    showColdStart,
    handleViewButtonClick
  } = useAutomatedTestListing();

  return (
    <div className="bg-white">
      {!showColdStart ? (
        <>
          <div className="bg-base-50 fixed top-16 z-[2] w-[calc(100vw-256px)] px-6 pb-4 pt-6">
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
              <Button onClick={handleViewButtonClick} colors="white">
                View documentation
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="bg-white">
                <ComboBox
                  onChange={(project) => handleSelectChange(project.value)}
                  defaultValue={{
                    value: 0,
                    label: 'All projects'
                  }}
                  wrapperClassName="bg-white"
                >
                  <ComboboxTrigger
                    onInputValueChange={onComboboxValueChange}
                    placeholder="Search Project"
                  />
                  <ComboboxOptionGroup>
                    {comboboxItems
                      .map((project) => ({
                        label: project.name,
                        value: project.normalisedName
                      }))
                      .map((item) => (
                        <ComboboxOptionItem key={item.value} option={item} />
                      ))}
                  </ComboboxOptionGroup>
                </ComboBox>
              </div>
              <InputField
                id="search-report"
                addOnBeforeInline={
                  <InputGroupAddOn inline>
                    <MdSearch className="h-5 w-5" />
                  </InputGroupAddOn>
                }
                placeholder="Search builds by name..."
                onChange={onInputValueChange}
                wrapperClassName="mr-4 w-80 bg-white"
              />
            </div>
          </div>
          <div className="mt-[218px]">
            {buildListing.length > 0 && (
              <AutomatedTestList
                buildList={buildListing}
                comboboxItems={comboboxItems}
              />
            )}
          </div>
        </>
      ) : (
        <div className="bg-base-50 px-6 pb-4 pt-6">
          <h1 className="text-base-900 mb-2 text-2xl font-bold">
            Automated tests
          </h1>
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="flex h-[calc(90vh-104px)] w-full flex-col items-center justify-center">
            <ColdStart />
          </div>
        </div>
      )}
    </div>
  );
}
