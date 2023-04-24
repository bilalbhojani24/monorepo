import React, { useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { throttle } from '@browserstack/utils/src/throttle';
import PropTypes from 'prop-types';

import {
  LF_ICON_COLOR,
  LF_ICON_CONTAINER_SIZE,
  LF_ICON_SIZE,
  LF_ICON_VARIANT,
  LF_MARGIN_SIZE
} from '../../shared/listFeedsNodeConstants';

const ListFeeds = (props) => {
  const {
    feedNumber,
    isFeedIconBorder,
    feedIcon,
    feedIconSize,
    feedIconColor,
    feedIconVariant,
    feedIconContainerSize,
    spacing,
    footerNode,
    headerNode,
    descriptionNode,
    throttleSpeed,
    showConnector
  } = props;
  const footerNodeRef = useRef(null);
  const containerRef = useRef(null);
  const handleMouseMove = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (
      containerRect.bottom - e.clientY < 40 &&
      containerRect.bottom < viewportHeight
    ) {
      footerNodeRef.current.style.visibility = 'visible';
    } else {
      footerNodeRef.current.style.visibility = 'hidden';
    }
  };
  const handleMouseEnter = () => {
    footerNodeRef.current.style.display = 'block';
  };
  const handleMouseLeave = () => {
    footerNodeRef.current.style.visibility = 'hidden';
    footerNodeRef.current.style.display = 'none';
  };
  return (
    <div
      ref={containerRef}
      className="relative mb-2 flex"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={throttle(handleMouseMove, throttleSpeed)}
    >
      {!!feedNumber && (
        <div
          className={twClassNames('mr-1 w-5 flex items-center justify-center', {
            'h-6': feedIconSize === LF_ICON_SIZE.sm,
            'h-8': feedIconSize === LF_ICON_SIZE.md,
            'h-10': feedIconSize === LF_ICON_SIZE.lg
          })}
        >
          {feedNumber}
        </div>
      )}
      <div
        className={twClassNames('flex flex-col justify-center', {
          'self-start': !showConnector
        })}
      >
        <div
          className={twClassNames('flex items-center justify-center', {
            'w-6 h-6': feedIconContainerSize === LF_ICON_SIZE.sm,
            'w-8 h-8': feedIconContainerSize === LF_ICON_SIZE.md,
            'w-10 h-10': feedIconContainerSize === LF_ICON_SIZE.lg
          })}
        >
          <div
            className={twClassNames(
              'rounded-full flex items-center justify-center box-border',
              {
                'w-6 h-6 text-base': feedIconSize === LF_ICON_SIZE.sm,
                'w-8 h-8 text-base': feedIconSize === LF_ICON_SIZE.md,
                'w-10 h-10 text-xl': feedIconSize === LF_ICON_SIZE.lg,
                'bg-white text-base-700 border border-base-300':
                  feedIconColor === LF_ICON_COLOR.white,
                'bg-base-600 text-white':
                  feedIconColor === LF_ICON_COLOR.grey &&
                  feedIconVariant === LF_ICON_VARIANT.dark,
                'bg-brand-600 text-white':
                  feedIconColor === LF_ICON_COLOR.brand &&
                  feedIconVariant === LF_ICON_VARIANT.dark,
                'bg-danger-600 text-white':
                  feedIconColor === LF_ICON_COLOR.danger &&
                  feedIconVariant === LF_ICON_VARIANT.dark,
                'bg-success-600 text-white':
                  feedIconColor === LF_ICON_COLOR.success &&
                  feedIconVariant === LF_ICON_VARIANT.dark,
                'bg-attention-300 text-attention-900':
                  feedIconColor === LF_ICON_COLOR.attention &&
                  feedIconVariant === LF_ICON_VARIANT.dark,
                'bg-base-200 text-base-500':
                  feedIconColor === LF_ICON_COLOR.grey &&
                  feedIconVariant === LF_ICON_VARIANT.light,
                'bg-brand-100 text-brand-700':
                  feedIconColor === LF_ICON_COLOR.brand &&
                  feedIconVariant === LF_ICON_VARIANT.light,
                'bg-danger-100 text-danger-700':
                  feedIconColor === LF_ICON_COLOR.danger &&
                  feedIconVariant === LF_ICON_VARIANT.light,
                'bg-success-100 text-success-700':
                  feedIconColor === LF_ICON_COLOR.success &&
                  feedIconVariant === LF_ICON_VARIANT.light,
                'bg-attention-100 text-attention-800':
                  feedIconColor === LF_ICON_COLOR.attention &&
                  feedIconVariant === LF_ICON_VARIANT.light,
                'border-0': !isFeedIconBorder
              }
            )}
          >
            {feedIcon}
          </div>
        </div>
        {showConnector && (
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          <div className="divide-base-300 flex h-full min-h-[16px] divide-x pt-2">
            <div className="w-1/2" />
            <div className="w-1/2" />
          </div>
        )}
      </div>
      <div
        className={twClassNames('ml-3 grow', {
          'mb-0': spacing === LF_MARGIN_SIZE.condensed,
          'mb-2': spacing === LF_MARGIN_SIZE.default,
          'mb-4': spacing === LF_MARGIN_SIZE.large
        })}
      >
        <div>{headerNode}</div>
        {!!descriptionNode && <div className="mt-2">{descriptionNode}</div>}
      </div>
      {!!footerNode && (
        <div ref={footerNodeRef} className="invisible absolute bottom-0 w-full">
          {footerNode}
        </div>
      )}
    </div>
  );
};

ListFeeds.propTypes = {
  feedNumber: PropTypes.node,
  feedIcon: PropTypes.node.isRequired,
  headerNode: PropTypes.node.isRequired,
  descriptionNode: PropTypes.node,
  footerNode: PropTypes.node,
  spacing: PropTypes.oneOf(LF_MARGIN_SIZE),
  feedIconSize: PropTypes.oneOf(LF_ICON_SIZE),
  feedIconColor: PropTypes.oneOf(LF_ICON_COLOR),
  feedIconVariant: PropTypes.oneOf(LF_ICON_VARIANT),
  feedIconContainerSize: PropTypes.oneOf(LF_ICON_CONTAINER_SIZE),
  showConnector: PropTypes.bool,
  isFeedIconBorder: PropTypes.bool,
  throttleSpeed: PropTypes.number
};

ListFeeds.defaultProps = {
  feedNumber: null,
  descriptionNode: null,
  footerNode: null,
  spacing: LF_MARGIN_SIZE.default,
  feedIconSize: LF_ICON_SIZE.md,
  feedIconColor: LF_ICON_COLOR.grey,
  feedIconVariant: LF_ICON_VARIANT.dark,
  feedIconContainerSize: LF_ICON_CONTAINER_SIZE.lg,
  showConnector: true,
  isFeedIconBorder: false,
  throttleSpeed: 200
};

export default ListFeeds;
