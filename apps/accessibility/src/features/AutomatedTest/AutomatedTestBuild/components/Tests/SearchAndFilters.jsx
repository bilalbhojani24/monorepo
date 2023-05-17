import React from 'react';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  InputField,
  InputGroupAddOn,
  MdExpandMore,
  MdSearch
} from '@browserstack/bifrost';

import useAutomatedTestBuild from '../../useAutomatedTestBuild';

const status = [
  {
    body: 'Status',
    id: 'status'
  }
];

const tags = [
  {
    body: 'Tags',
    id: 'tags'
  }
];

const folders = [
  {
    body: 'Folders',
    id: 'folders'
  }
];

const pages = [
  {
    body: 'Pages',
    id: 'pages'
  }
];

export default function SearchAndFilters() {
  const { onInputValueChange, handleSearchFilter } = useAutomatedTestBuild();

  return (
    <div className="flex justify-between px-6 py-4">
      <div>
        <InputField
          id="search-test"
          addOnBeforeInline={
            <InputGroupAddOn inline>
              <MdSearch className="h-5 w-5" />
            </InputGroupAddOn>
          }
          placeholder="Search by name or error"
          onChange={onInputValueChange}
          wrapperClassName="mr-4 w-80"
        />
      </div>

      <div className="flex gap-4">
        <Dropdown onClick={handleSearchFilter} id="scanFilter">
          <div className="flex">
            <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
              Status
              <MdExpandMore className="h-5 w-5" aria-hidden="true" />
            </DropdownTrigger>
          </div>
          <DropdownOptionGroup>
            {status.map((opt) => (
              <DropdownOptionItem key={opt.id} option={opt} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>

        <Dropdown onClick={handleSearchFilter} id="scanFilter">
          <div className="flex">
            <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
              Tags
              <MdExpandMore className="h-5 w-5" aria-hidden="true" />
            </DropdownTrigger>
          </div>
          <DropdownOptionGroup>
            {tags.map((opt) => (
              <DropdownOptionItem key={opt.id} option={opt} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>

        <Dropdown onClick={handleSearchFilter} id="scanFilter">
          <div className="flex">
            <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
              Folders
              <MdExpandMore className="h-5 w-5" aria-hidden="true" />
            </DropdownTrigger>
          </div>
          <DropdownOptionGroup>
            {folders.map((opt) => (
              <DropdownOptionItem key={opt.id} option={opt} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>

        <Dropdown onClick={handleSearchFilter} id="scanFilter">
          <div className="flex">
            <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
              Pages
              <MdExpandMore className="h-5 w-5" aria-hidden="true" />
            </DropdownTrigger>
          </div>
          <DropdownOptionGroup>
            {pages.map((opt) => (
              <DropdownOptionItem key={opt.id} option={opt} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>
      </div>
    </div>
  );
}
