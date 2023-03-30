import React, { useState } from 'react';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11yInputField,
  O11yPageHeadings,
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger,
  O11yStackedList,
  O11yStackedListGroup
} from 'common/bifrostProxy';
import { WRAPPER_GAP_CLASS } from 'constants/common';

import ListGroupHeader from '../components/ListGroupHeader';
import { INTEGRATIONS } from '../constants';

const ALL_CATEGORIES_OPTION = {
  label: 'All Categories',
  value: 'all'
};

function Integrations() {
  const [availableIntegrations, setAvailableIntegrations] =
    useState(INTEGRATIONS);

  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = ({ target: { value } }) => {
    setSearchText(value);
    if (!value) {
      setAvailableIntegrations(INTEGRATIONS);
    }
    const searchVal = value.toLowerCase();
    const foundIntegrations = [];
    INTEGRATIONS.forEach((integration) => {
      const matched = [];
      integration.list.forEach((integrationItem) => {
        if (integrationItem.name.toLowerCase().includes(searchVal)) {
          matched.push(integrationItem);
        }
      });
      if (matched.length) {
        foundIntegrations.push({
          ...integration,
          list: matched
        });
      }
    });
    setAvailableIntegrations(foundIntegrations);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setAvailableIntegrations(INTEGRATIONS);
  };

  const onCategorySelect = (category) => {
    if (category.value === 'all') {
      setAvailableIntegrations(INTEGRATIONS);
    } else {
      setAvailableIntegrations([
        INTEGRATIONS.find((integration) => integration.value === category.value)
      ]);
    }
  };

  return (
    <div className={twClassNames('w-full flex flex-col', WRAPPER_GAP_CLASS)}>
      <O11yPageHeadings
        heading="Integrations"
        wrapperClassName="p-6 border-b border-b-base-200"
      />
      <main className="flex flex-1 flex-col overflow-auto p-6 pt-0">
        <section className="bg-base-50 flex max-w-7xl justify-between gap-6 py-6">
          <div className="w-full max-w-xs">
            <O11yInputField
              addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
              placeholder="Search"
              id="integration-search-value"
              value={searchText}
              onChange={handleSearchTextChange}
              wrapperClassName="bg-white"
              addOnAfterInline={
                <>
                  {searchText ? (
                    <O11yButton
                      variant="minimal"
                      colors="white"
                      icon={<MdClose className="text-base-800 text-xl" />}
                      onClick={handleClearSearch}
                      isIconOnlyButton
                      size="extra-small"
                    />
                  ) : null}
                </>
              }
            />
          </div>
          <div className="max-w-sm">
            <O11ySelectMenu
              defaultValue={ALL_CATEGORIES_OPTION}
              onChange={onCategorySelect}
            >
              <O11ySelectMenuTrigger placeholder="All Categories" value="" />
              <O11ySelectMenuOptionGroup>
                <O11ySelectMenuOptionItem
                  checkPosition="right"
                  wrapperClassName="text-sm"
                  option={ALL_CATEGORIES_OPTION}
                />
                {INTEGRATIONS.map((integration) => (
                  <O11ySelectMenuOptionItem
                    checkPosition="right"
                    wrapperClassName="text-sm"
                    option={{
                      label: integration.name,
                      value: integration.value
                    }}
                  />
                ))}
              </O11ySelectMenuOptionGroup>
            </O11ySelectMenu>
          </div>
        </section>
        <section className="border-l-base-200 overflow-auto border-l pt-0">
          <div className="border-r-base-200 border-b-base-200 max-w-7xl border-r border-b">
            <O11yStackedList>
              {availableIntegrations.map((integration) => (
                <O11yStackedListGroup
                  key={integration.name}
                  wrapperClassName="fist:rounded-lg"
                  heading={<ListGroupHeader title={integration.name} />}
                >
                  {integration.list.map(
                    (integrationItem) => integrationItem.component
                  )}
                </O11yStackedListGroup>
              ))}
            </O11yStackedList>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Integrations;
