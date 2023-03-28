import React, { useState } from 'react';
import { MdUnfoldLess, MdUnfoldMore } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';

import TestListFilters from './TestListFilters';
import TestListSearch from './TestListSearch';

const TestList = () => {
  const [expandAll, setExpandAll] = useState(false);
  const invertExpandAll = () => setExpandAll((prevValue) => !prevValue);
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-base-200 flex justify-between border-b py-4 pl-8 pr-5">
        <div className="flex w-full">
          <O11yButton
            isIconOnlyButton
            colors="white"
            variant="minimal"
            wrapperClassName="mr-4"
            icon={
              expandAll ? (
                <MdUnfoldLess className="h-5 w-5" />
              ) : (
                <MdUnfoldMore className="h-5 w-5" />
              )
            }
            onClick={invertExpandAll}
          />
          <TestListSearch />
        </div>

        <TestListFilters />
        <div />
      </div>
      <div className="h-full">
        <p>Test listing will go here</p>
      </div>
    </div>
  );
};

export default TestList;
