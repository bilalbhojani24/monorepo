import React, { useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { MdErrorOutline } from '../Icon';
import Tooltip from '../Tooltip';
import { TooltipPropTypes } from '../Tooltip/components/TooltipContainer';

import './styles.scss';

const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p'
};

const TruncateText = ({
  children,
  wrapperClassName,
  truncateByLine,
  headerTooltipProps,
  tooltipTriggerIcon,
  hidetooltipTriggerIcon,
  containerClassName,
  variant
}) => {
  const Component = variantsMapping[variant];
  const [truncatedDataTooltip, setTruncatedDataTooltip] = useState(false);
  const headerNameRef = useRef(null);
  const showHeaderTooltip = () => {
    const element = headerNameRef.current;
    if (element !== null) {
      const result =
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth;
      setTruncatedDataTooltip(result);
    } else {
      setTruncatedDataTooltip(false);
    }
  };

  useEffect(() => {
    showHeaderTooltip();
  }, [children]);

  return (
    <div
      className={twClassNames(
        'relative',
        {
          'pr-3': !hidetooltipTriggerIcon
        },
        containerClassName
      )}
    >
      <Component
        className={twClassNames(
          `line-clamp-${truncateByLine}`,
          wrapperClassName
        )}
        ref={headerNameRef}
      >
        {children}
      </Component>
      {truncatedDataTooltip && (
        <span
          className={twClassNames('absolute bottom-0', {
            'right-0': !hidetooltipTriggerIcon,
            'right-1': hidetooltipTriggerIcon
          })}
        >
          <Tooltip
            theme="dark"
            placementSide="left"
            content={<p className="text-base-300 mb-0 px-4">{children}</p>}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...headerTooltipProps}
          >
            {hidetooltipTriggerIcon ? (
              <span className="invisible">...</span>
            ) : (
              tooltipTriggerIcon
            )}
          </Tooltip>
        </span>
      )}
    </div>
  );
};

TruncateText.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string,
  truncateByLine: PropTypes.number,
  headerTooltipProps: PropTypes.shape(TooltipPropTypes),
  tooltipTriggerIcon: PropTypes.node,
  hidetooltipTriggerIcon: PropTypes.bool,
  containerClassName: PropTypes.string,
  variant: PropTypes.string
};
TruncateText.defaultProps = {
  children: null,
  wrapperClassName: '',
  truncateByLine: 2,
  headerTooltipProps: {},
  tooltipTriggerIcon: <MdErrorOutline className="max-h-4" />,
  hidetooltipTriggerIcon: false,
  containerClassName: '',
  variant: 'p'
};

export default TruncateText;
