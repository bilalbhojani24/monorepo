import React, { isValidElement, useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { MdErrorOutline } from '../Icon';
import { TooltipPropTypes } from '../Tooltip/components/TooltipContainer';

import TooltipWrapper from './components/TooltipWrapper';

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
  headerTooltipProps,
  tooltipTriggerIcon,
  hidetooltipTriggerIcon,
  isTooltip,
  containerClassName,
  variant,
  tooltipContent,
  isFullWidthTooltip,
  truncateUsingClamp
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
  }, [children, wrapperClassName]);

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
      <TooltipWrapper
        tooltipContent={
          tooltipContent || (
            <p className="text-base-300 mb-0 px-4">{children}</p>
          )
        }
        isTooltipToBeWrapped={isFullWidthTooltip}
        headerTooltipProps={{ ...headerTooltipProps }}
      >
        <Component
          className={twClassNames(
            `break-all`,
            {
              'line-clamp-1':
                !wrapperClassName.includes('line-clamp-') && truncateUsingClamp,
              truncate: !truncateUsingClamp
            },
            wrapperClassName
          )}
          ref={headerNameRef}
        >
          {React.Children.map(children, (child) => {
            if (isValidElement(child))
              return React.cloneElement(child, {
                truncated: truncatedDataTooltip
              });
            return child;
          })}
        </Component>
      </TooltipWrapper>

      {!isFullWidthTooltip && truncatedDataTooltip && isTooltip && (
        <span
          className={twClassNames('absolute bottom-0', {
            'right-0': !hidetooltipTriggerIcon,
            'right-1': hidetooltipTriggerIcon
          })}
        >
          <TooltipWrapper
            tooltipContent={
              tooltipContent || (
                <p className="text-base-300 mb-0 px-4">{children}</p>
              )
            }
            isTooltipToBeWrapped
            headerTooltipProps={{ ...headerTooltipProps }}
          >
            {hidetooltipTriggerIcon ? (
              <span className="invisible">...</span>
            ) : (
              tooltipTriggerIcon
            )}
          </TooltipWrapper>
        </span>
      )}
    </div>
  );
};

TruncateText.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string,
  tooltipContent: PropTypes.node,
  headerTooltipProps: PropTypes.shape(TooltipPropTypes),
  isTooltip: PropTypes.bool,
  tooltipTriggerIcon: PropTypes.node,
  hidetooltipTriggerIcon: PropTypes.bool,
  containerClassName: PropTypes.string,
  variant: PropTypes.string,
  isFullWidthTooltip: PropTypes.bool,
  truncateUsingClamp: PropTypes.bool
};
TruncateText.defaultProps = {
  children: null,
  wrapperClassName: '',
  tooltipContent: null,
  headerTooltipProps: {},
  isTooltip: true,
  tooltipTriggerIcon: <MdErrorOutline className="max-h-4" />,
  hidetooltipTriggerIcon: false,
  containerClassName: '',
  variant: 'p',
  isFullWidthTooltip: false,
  truncateUsingClamp: true
};

export default TruncateText;
