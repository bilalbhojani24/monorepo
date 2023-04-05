import React, { useState } from 'react';
import { MdClose, MdSearch, MdSearchOff } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11yEmptyState,
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

const getMatchedIntegrationsByText = (list, searchVal) => {
  const matched = [];
  list.forEach((integrationItem) => {
    if (integrationItem.name.toLowerCase().includes(searchVal.toLowerCase())) {
      matched.push(integrationItem);
    }
  });
  return matched;
};

function Integrations() {
  const [availableIntegrations, setAvailableIntegrations] =
    useState(INTEGRATIONS);

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    ALL_CATEGORIES_OPTION
  );

  const handleFilterByCategoryAndSearchVal = (searchVal, categoryType) => {
    const matchedCategory = INTEGRATIONS.find(
      (integration) => integration.value === categoryType
    );
    if (!matchedCategory) {
      setAvailableIntegrations([]);
    } else {
      const matched = getMatchedIntegrationsByText(
        matchedCategory.list,
        searchVal
      );
      if (matched.length) {
        setAvailableIntegrations([
          {
            ...matchedCategory,
            list: matched
          }
        ]);
      } else {
        setAvailableIntegrations([]);
      }
    }
  };

  const handleFilterResults = (searchVal, categoryType) => {
    if (searchVal && categoryType !== 'all') {
      handleFilterByCategoryAndSearchVal(searchVal, categoryType);
    } else if (searchVal && categoryType === 'all') {
      const foundIntegrations = [];
      INTEGRATIONS.forEach((integration) => {
        const matched = getMatchedIntegrationsByText(
          integration.list,
          searchVal
        );
        if (matched.length) {
          foundIntegrations.push({
            ...integration,
            list: matched
          });
        }
      });
      setAvailableIntegrations(foundIntegrations);
    } else if (!searchVal && categoryType !== 'all') {
      const foundIntegrations = INTEGRATIONS.find(
        (integration) => integration.value === categoryType
      );
      setAvailableIntegrations(foundIntegrations ? [foundIntegrations] : []);
    } else {
      setAvailableIntegrations(INTEGRATIONS);
    }
  };

  const handleSearchTextChange = ({ target: { value } }) => {
    setSearchText(value);
    handleFilterResults(value, selectedCategory.value);
  };

  const onCategorySelect = (category) => {
    setSelectedCategory(category);
    handleFilterResults(searchText, category.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    handleFilterResults('', selectedCategory.value);
  };

  const handleClearFilters = () => {
    setSelectedCategory(ALL_CATEGORIES_OPTION);
    setSearchText('');
    handleFilterResults('', ALL_CATEGORIES_OPTION.value);
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
              value={selectedCategory}
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
        {availableIntegrations.length ? (
          <section className="border-l-base-200 overflow-auto border-l pt-0">
            <div className="border-r-base-200 border-b-base-200 max-w-7xl border-b border-r">
              <O11yStackedList>
                {availableIntegrations.map((integration) => (
                  <O11yStackedListGroup
                    key={integration.name}
                    heading={<ListGroupHeader title={integration.name} />}
                  >
                    {integration.list.map((integrationItem) => (
                      <integrationItem.Component />
                    ))}
                  </O11yStackedListGroup>
                ))}
              </O11yStackedList>
            </div>
          </section>
        ) : (
          <section className="border-t-base-200 flex max-w-7xl flex-1 items-center justify-center border-t">
            <O11yEmptyState
              title="No Results Found"
              description="No matching results found. Try searching with another combination"
              mainIcon={
                <MdSearchOff className="text-base-500 inline-block h-12 w-12" />
              }
              buttonProps={{
                children: 'Clear Filters',
                onClick: handleClearFilters,
                size: 'default'
              }}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default Integrations;
