import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

const StatsCard = ({
  title,
  info,
  metricsTitle,
  metricSubTitle,
  wrapperClassName,
  isLoading
}) => {
  if (isLoading) {
    return <O11yLoader wrapperClassName="h-[200px]" />;
  }
  return (
    <section
      className={twClassNames(
        'ring-base-200 rounded-lg p-4 shadow-md ring-1',
        wrapperClassName
      )}
    >
      <div className="mb-1 flex items-center gap-1">
        <span className="text-base-500 text-sm font-medium leading-5">
          {title}
        </span>
        <O11yTooltip
          theme="dark"
          arrowWidth={0}
          arrowHeight={0}
          sideOffset={2}
          content={info}
          triggerWrapperClassName="inline"
          wrapperClassName="px-2 text-sm leading-5 text-white"
        >
          <MdInfoOutline className="text-base-500 h-4 w-4" />
        </O11yTooltip>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-base-900 text-3xl font-semibold leading-9">
          {metricsTitle}
        </span>
        <span className="text-base-400 self-end text-sm font-medium leading-5">
          {metricSubTitle}
        </span>
      </div>
      <div className="h-24">Graph</div>
    </section>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.node,
  metricsTitle: PropTypes.string.isRequired,
  metricSubTitle: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  isLoading: PropTypes.bool
};

StatsCard.defaultProps = {
  info: null,
  wrapperClassName: '',
  isLoading: false
};

export default StatsCard;
