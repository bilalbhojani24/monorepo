import React, { useEffect, useRef, useState } from 'react';
import { Draggable, Resizable } from '@browserstack/bifrost';
import { useResizeObserver } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { DEFAULT_RESIZE_HANDLE, DEFAULT_WIDGET_DIMENSIONS } from '../constants';

const DraggableResizable = ({ children, childRef }) => {
  const widgetRef = useRef(null);
  const [widgetHeight, setWidgetHeight] = useState(null);
  const [containerHeight, setContainerHeight] = useState(widgetHeight);
  const windowDimensions = useResizeObserver(childRef);
  const childHeight = childRef?.current?.getBoundingClientRect().height;
  const t = 12;
  useEffect(() => {
    if (
      childRef?.current &&
      (childHeight || windowDimensions.inlineSize || windowDimensions.height)
    ) {
      let calcHeight =
        childHeight || windowDimensions.inlineSize || windowDimensions.height;
      if (calcHeight < DEFAULT_WIDGET_DIMENSIONS.MIN[1]) {
        const [, minHeight] = DEFAULT_WIDGET_DIMENSIONS.MIN;
        calcHeight = minHeight;
      }
      if (calcHeight > DEFAULT_WIDGET_DIMENSIONS.MAX[1] - t) {
        setContainerHeight(DEFAULT_WIDGET_DIMENSIONS.MAX[1] - t);
        setWidgetHeight(DEFAULT_WIDGET_DIMENSIONS.MAX[1]);
      } else {
        setContainerHeight(calcHeight);
        setWidgetHeight(calcHeight + t);
      }
    }
  }, [
    childRef,
    childHeight,
    windowDimensions.inlineSize,
    windowDimensions.height
  ]);

  const onResize = (__, { size }) => {
    setWidgetHeight(size.height);
    setContainerHeight(size.height - t);
  };

  return (
    <Draggable ref={widgetRef} handle=".drag-handle">
      <div ref={widgetRef} className="absolute">
        <Resizable
          className="border-base-200 relative flex flex-col items-center overflow-hidden rounded-md border border-solid"
          handle={(__resizeHandleAxis, ref) => (
            <div
              className="bg-base-200 relative bottom-0 left-1/2 mb-1 h-1 w-8 -translate-x-1/2 rounded-3xl hover:cursor-s-resize"
              ref={ref}
            />
          )}
          width={DEFAULT_WIDGET_DIMENSIONS.INITIAL_WIDTH}
          height={widgetHeight || DEFAULT_WIDGET_DIMENSIONS.MIN[1]}
          onResize={onResize}
          resizeHandles={DEFAULT_RESIZE_HANDLE}
          minConstraints={DEFAULT_WIDGET_DIMENSIONS.MIN}
          maxConstraints={DEFAULT_WIDGET_DIMENSIONS.MAX}
        >
          <div className="w-full" style={{ height: `${containerHeight}px` }}>
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

DraggableResizable.propTypes = {
  children: PropTypes.node,
  childRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
DraggableResizable.defaultProps = {
  children: null,
  childRef: null
};

export default DraggableResizable;
