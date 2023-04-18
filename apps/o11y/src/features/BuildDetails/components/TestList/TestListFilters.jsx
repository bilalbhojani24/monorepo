import React, { useState } from 'react';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';

const TestListFilters = () => {
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);

  const showSlideover = () => {
    setIsSlideoverVisible(true);
  };
  const hideSlideover = () => {
    setIsSlideoverVisible(false);
  };
  const onApplyFilterClick = () => {
    hideSlideover();
  };

  return (
    <>
      <O11ySlideover show={isSlideoverVisible} backgroundOverlay={false}>
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={hideSlideover}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          <div className="flex flex-col gap-6 px-4">
            <p>Filter 1</p>
            <p>Filter 1</p>
          </div>
        </O11ySlideoverBody>

        <O11ySlideoverFooter isBorder="true" position="right">
          <O11yButton variant="primary" colors="white" onClick={hideSlideover}>
            Cancel
          </O11yButton>
          <O11yButton onClick={onApplyFilterClick}>Apply</O11yButton>
        </O11ySlideoverFooter>
      </O11ySlideover>
      <O11yButton
        variant="primary"
        colors="white"
        wrapperClassName="rounded"
        icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
        onClick={showSlideover}
        isIconOnlyButton
      />
    </>
  );
};

export default TestListFilters;
