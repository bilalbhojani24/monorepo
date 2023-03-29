import React from 'react';
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

function Integrations() {
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
              // value={searchText}
              // addOnAfterInline={
              //   searchText.length ? (
              //     <O11yButton
              //       variant="minimal"
              //       colors="white"
              //       icon={<MdClose className="text-lg" />}
              //       onClick={clearSearchText}
              //       isIconOnlyButton
              //       size="extra-small"
              //     />
              //   ) : null
              // }
              addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
              placeholder="Search"
              // onKeyDown={handleSearchTextChange}
              // onChange={handleOnChange}
              id="integration-search-value"
            />
          </div>
          <div className="w-40">
            <O11ySelectMenu>
              <O11ySelectMenuTrigger placeholder="All Categories" value="" />
              <O11ySelectMenuOptionGroup>
                <O11ySelectMenuOptionItem
                  checkPosition="right"
                  wrapperClassName="text-sm"
                  option={{
                    label: 'All Categories',
                    value: 'all'
                  }}
                />
              </O11ySelectMenuOptionGroup>
            </O11ySelectMenu>
          </div>
        </section>
        <section className="border-x-base-200 border-b-base-200 max-w-3xl overflow-auto border-x border-b pt-0">
          <O11yStackedList>
            {INTEGRATIONS.map((integration) => (
              <O11yStackedListGroup
                key={integration.name}
                wrapperClassName="fist:rounded-lg"
                heading={<ListGroupHeader title={integration.name} />}
              >
                {integration.list.map((integrationItem) => (
                  <O11yStackedListItem
                    actions={
                      <O11yButton variant="rounded" colors="white" size="small">
                        View
                      </O11yButton>
                    }
                  >
                    <O11yStackedListCommon
                      icon={integrationItem.icon}
                      title={integrationItem.name}
                      subTitle="Documentation"
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
