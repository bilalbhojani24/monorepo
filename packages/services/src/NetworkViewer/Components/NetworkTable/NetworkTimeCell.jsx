import React from 'react';
import { Tooltip, TooltipBody } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { useNetwork } from '../../state/Context';
import { isWidthAvailableToShowWaterfall } from '../../utils';

import TimeChart from './TimeChart';
import TimeChartTooltip from './TimeChartTooltip';

const NetworkTimeCell = ({ formattedValue, payload, showWaterfall }) => {
  const { state } = useNetwork();
  const maxTime = state.get('totalNetworkTime');
  const isWaterfall =
    showWaterfall &&
    isWidthAvailableToShowWaterfall(state.get('containerWidth'));
  return payload.time ? (
    <Tooltip
      content={
        <TooltipBody wrapperClassName="max-h-screen overflow-auto">
          <TimeChartTooltip data={payload.timings} fromRequestDetail={false} />
        </TooltipBody>
      }
      placementSide="bottom"
      triggerWrapperClassName="w-full"
      wrapperClassName="w-96"
      size="sm"
    >
      <section
        className={twClassNames('flex flex-col gap-2', {
          'flex-row items-center': isWaterfall
        })}
      >
        <section
          className={twClassNames({
            'w-[100px] shrink-0': isWaterfall
          })}
        >
          {formattedValue}
        </section>
        <section className="flex-1">
          <TimeChart
            maxTime={maxTime}
            timings={payload.timings}
            isWaterfall={isWaterfall}
            renderFrom="time-cell"
          />
        </section>
      </section>
    </Tooltip>
  ) : null;
};

NetworkTimeCell.propTypes = {
  formattedValue: PropTypes.string.isRequired,
  payload: PropTypes.objectOf(PropTypes.any).isRequired,
  showWaterfall: PropTypes.bool
};
NetworkTimeCell.defaultProps = {
  showWaterfall: true
};

export default NetworkTimeCell;
