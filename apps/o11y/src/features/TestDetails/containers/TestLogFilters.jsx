import React from 'react';
import {
  MdClose,
  MdOutlineFilterAlt,
  MdOutlineMenu,
  MdSearch
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yInputField, O11yPopover } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const TestLogFilters = ({ onSearchChange, searchText }) => {
  const clearSearchText = () => {
    onSearchChange('');
  };

  const handleOnChange = (e) => {
    onSearchChange(e.target.value);
  };
  return (
    <>
      <div>
        <O11yInputField
          value={searchText}
          addOnBeforeInline={<MdSearch className="text-base-400" />}
          addOnAfterInline={
            <MdClose
              onClick={clearSearchText}
              className={twClassNames('invisible', {
                visible: searchText.length > 0
              })}
            />
          }
          addOnBeforeInlineWrapperClassName=""
          addOnAfterInlineWrapperClassName=""
          placeholder="Search in logs"
          onChange={handleOnChange}
          // wrapperClassName="w-48"
        />
      </div>
      <div className="flex items-center gap-3">
        <O11yPopover
          content={
            <div className="rounded-md bg-white shadow-md">
              <span>Steps</span>
            </div>
          }
          defaultOpen
        >
          <O11yButton
            icon={<MdOutlineMenu className="text-base-500 h-4 w-4" />}
            colors="white"
          >
            <span className="text-base-700 text-xs font-medium leading-4">
              Steps
            </span>
          </O11yButton>
        </O11yPopover>
        <O11yPopover>
          <O11yButton
            icon={
              <MdOutlineFilterAlt className="text-base-700 h-full w-full" />
            }
            colors="white"
            isIconOnlyButton
          />
        </O11yPopover>
      </div>
    </>
  );
};

TestLogFilters.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
};

export default TestLogFilters;
