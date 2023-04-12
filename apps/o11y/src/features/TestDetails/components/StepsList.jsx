import React, { memo, useEffect, useState } from 'react';
import { MdOutlineMenu } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownOptionItem,
  O11yDropdownTrigger,
  O11yTruncateText
} from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getParsedJSON, getStatusColors } from '../utils';

import LogItemDuration from './LogItemDuration';

const StepsList = memo(({ steps, onClickStep }) => {
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();

  return (
    <O11yDropdown
      onClick={(data) => {
        onClickStep(data.id);
      }}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          handleLogTDInteractionEvent({ interaction: 'steps_viewed' });
        }
      }}
    >
      <O11yDropdownTrigger>
        <MdOutlineMenu className="text-base-500 mr-2 h-4 w-4" />
        <span className="text-base-700 text-xs font-medium leading-4">
          Steps
        </span>
      </O11yDropdownTrigger>
      <O11yDropdownOptionGroup wrapperClassName="w-80">
        {steps.map((step, idx) => (
          <O11yDropdownOptionItem
            key={step}
            option={{
              id: idx,
              body: <StepLogItem data={step} />
            }}
          />
        ))}
      </O11yDropdownOptionGroup>
    </O11yDropdown>
  );
});

StepsList.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickStep: PropTypes.func.isRequired
};

export default StepsList;

export function StepLogItem({ data }) {
  const [logData, setLogData] = useState({});

  useEffect(() => {
    if (!isEmpty(data)) {
      setLogData(getParsedJSON(data?.content) || {});
    }
  }, [data]);

  return (
    <div className={twClassNames('flex gap-2 text-left items-center')}>
      <div
        className={twClassNames(
          'h-2 w-2 rounded-full',
          getStatusColors(logData?.status)
        )}
      />
      <div className="flex-1">
        <O11yTruncateText
          wrapperClassName="w-full line-clamp-1"
          tooltipContent={
            <p className="w-full px-4 text-sm font-medium leading-5 text-white">
              {logData?.value}
            </p>
          }
        >
          <span className="text-base-900 text-sm font-medium leading-5">
            {logData?.value}
          </span>
        </O11yTruncateText>
      </div>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
    </div>
  );
}
StepLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
StepLogItem.defaultProps = {};
