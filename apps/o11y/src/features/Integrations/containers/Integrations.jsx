import React, { useState } from 'react';
import { MdSearch } from '@browserstack/bifrost';
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
  O11yStackedListCommon,
  O11yStackedListGroup,
  O11yStackedListItem
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
        <section className="bg-base-50 flex max-w-3xl justify-between gap-6 py-6">
          <div className="w-full max-w-xs">
            <O11yInputField
              addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
              placeholder="Search"
              id="integration-search-value"
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
        <section className="border-x-base-200 border-b-base-200 max-w-3xl overflow-auto border-x border-b pt-0">
          <O11yStackedList>
            {availableIntegrations.map((integration) => (
              <O11yStackedListGroup
                key={integration.name}
                wrapperClassName="fist:rounded-lg"
                heading={<ListGroupHeader title={integration.name} />}
              >
                {integration.list.map((integrationItem) => (
                  <O11yStackedListItem
                    actions={
                      <O11yButton variant="rounded" colors="white" size="small">
                        {integrationItem.cta.name}
                      </O11yButton>
                    }
                  >
                    <O11yStackedListCommon
                      icon={integrationItem.icon}
                      title={integrationItem.name}
                      subTitle={integrationItem.type}
                    />
                  </O11yStackedListItem>
                ))}
              </O11yStackedListGroup>
            ))}
          </O11yStackedList>
        </section>
      </main>
    </div>
  );
}

export default Integrations;
