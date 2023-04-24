import React from 'react';
import {
  Badge,
  MdOutlineLock,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const NetworkFileName = ({ formattedValue, payload }) => {
  const hasError = payload?.status >= 400 || payload?.error;
  return (
    <section className="flex flex-col gap-1">
      <section>
        <Tooltip
          content={
            <TooltipBody>
              <p className="whitespace-normal break-words text-sm">
                {payload.url}
              </p>
            </TooltipBody>
          }
          placementSide="right"
          theme="dark"
          triggerWrapperClassName="max-w-full truncate"
          size="sm"
        >
          <span>{formattedValue}</span>
        </Tooltip>
      </section>
      <section
        className={twClassNames('text-base-500 flex items-center gap-2', {
          'text-danger-700': hasError
        })}
      >
        <Badge
          isRounded={false}
          text={payload.method}
          modifier={hasError ? 'error' : 'base'}
        />
        {payload?.url?.indexOf('https') === 0 && (
          <span>
            <MdOutlineLock role="img" title="lock" aria-hidden="false" />
          </span>
        )}
        <span className="truncate">{payload.domain}</span>
      </section>
    </section>
  );
};

NetworkFileName.propTypes = {
  payload: PropTypes.object.isRequired,
  formattedValue: PropTypes.string.isRequired
};

export default NetworkFileName;
