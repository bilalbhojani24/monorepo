import React, { useCallback, useState } from 'react';
import { MdClose, MdOutlineFilterAlt, MdSearch } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yInputField, O11yPopover } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import StepsList from '../components/StepsList';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

import FilterPopoverContent from './FilterPopoverContent';

const TestLogFilters = ({
  onSearchChange,
  searchText,
  steps,
  onClickStepItem
}) => {
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();

  const clearSearchText = () => {
    onSearchChange('');
  };

  const handleOnChange = (e) => {
    onSearchChange(e.target.value);
  };

  const highlightStep = useCallback((elem) => {
    elem.classList.add('animateBg');
    setTimeout(() => {
      elem.classList.remove('animateBg');
    }, 1000);
  }, []);

  const handleClickStep = useCallback(
    (idx) => {
      const idxElem = document.querySelector(`[data-stepidx="${idx}"]`);
      if (idxElem) {
        onClickStepItem(idxElem?.offsetTop);
        highlightStep(idxElem);
        handleLogTDInteractionEvent({ interaction: 'steps_navigated' });
      }
    },
    [highlightStep, onClickStepItem, handleLogTDInteractionEvent]
  );

  const closeFilterPopover = () => {
    setShowFilterPopover(false);
  };

  return (
    <>
      <div className="pl-1">
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
        />
      </div>
      <div className="flex items-center gap-3">
        <StepsList steps={steps} onClickStep={handleClickStep} />
        <O11yPopover
          theme="light"
          arrowWidth={0}
          arrowHeight={0}
          placementAlign="end"
          placementSide="bottom"
          size="2xl"
          content={<FilterPopoverContent onClose={closeFilterPopover} />}
          show={showFilterPopover}
        >
          <O11yButton
            icon={
              <MdOutlineFilterAlt className="text-base-700 h-full w-full" />
            }
            colors="white"
            isIconOnlyButton
            onClick={() => {
              setShowFilterPopover(!showFilterPopover);
            }}
          />
        </O11yPopover>
      </div>
    </>
  );
};

TestLogFilters.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickStepItem: PropTypes.func.isRequired
};

export default TestLogFilters;
