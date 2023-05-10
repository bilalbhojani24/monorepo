import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Resizable } from '@browserstack/bifrost';
import { useResizeObserver } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { setWidgetHeight as setWidgetHeightInRedux } from '../../slices/widgetSlice';
import { DEFAULT_RESIZE_HANDLE, DEFAULT_WIDGET_DIMENSIONS } from '../constants';

import { getWidgetRenderPosition } from './helpers';

const DraggableResizable = ({ children, position, positionRef }) => {
  const dispatch = useDispatch();
  const widgetRef = useRef(null);
  const bodyRef = useRef(document.body);
  const bodyResizeObserver = useResizeObserver(bodyRef);
  const widgetResizeObserver = useResizeObserver(widgetRef);
  // additional 16 px space for easy access to grab and use resize handle
  const windowHeight = document.body.getBoundingClientRect().height - 16;
  const windowWidth = document.body.getBoundingClientRect().width - 16;

  // initial widget height should be 90% of the window height
  // multiply by 0.9 to get 90% of the windowHeight
  const widgetInitialHeight =
    windowHeight * 0.9 < DEFAULT_WIDGET_DIMENSIONS.MIN[1]
      ? DEFAULT_WIDGET_DIMENSIONS.MIN[1]
      : windowHeight * 0.9;
  const [widgetDimensions, setWidgetDimensions] = useState({
    height: widgetInitialHeight,
    width: DEFAULT_WIDGET_DIMENSIONS.MIN[0]
  });
  const [refAquired, setRefAquired] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(null);

  useEffect(() => {
    setRefAquired(true);
  }, []);
  // looks at width related changes of the container so that
  // widget renders properly with the body
  useEffect(() => {
    const widgetRect = widgetRef.current?.getBoundingClientRect() || {};
    let { width } = widgetRect;
    width =
      width < DEFAULT_WIDGET_DIMENSIONS.MIN[0]
        ? DEFAULT_WIDGET_DIMENSIONS.MIN[0]
        : width;
    if (widgetDimensions.width !== width) {
      setWidgetDimensions({ ...widgetDimensions, width });
    }
  }, [widgetDimensions, widgetResizeObserver]);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (refAquired && widgetRef.current) {
      const widgetRefClientRect = widgetRef.current?.getBoundingClientRect();

      const pos = getWidgetRenderPosition(
        position,
        positionRef?.current?.getBoundingClientRect(),
        widgetRefClientRect
      );
      let { y } = pos;

      // is widget going out of screen?
      if (y + widgetDimensions.height > windowHeight) {
        const overflowY = y + widgetDimensions.height - windowHeight;
        y = y - overflowY > 8 ? y - overflowY : 8;
      }

      setWidgetPosition((prev) => {
        const xVal = prev && prev.x < pos.x ? prev.x : pos.x;
        const yVal = prev?.y ?? y;
        return {
          x: xVal < 8 ? 8 : xVal,
          y: yVal
        };
      });
    }
  }, [
    position,
    refAquired,
    windowWidth,
    positionRef,
    windowHeight,
    bodyResizeObserver,
    widgetDimensions
  ]);

  const onDrag = (__, { x, y }) => {
    setWidgetPosition({
      x,
      y
    });
  };

  const onResize = (__, { size }) => {
    setWidgetDimensions({ ...widgetDimensions, height: size.height });
    dispatch(setWidgetHeightInRedux({ height: size.height }));
  };

  // adjusts height of the widget in case there's any
  // change in the body height
  useEffect(() => {
    if (
      widgetPosition &&
      widgetPosition.y + widgetDimensions.height > windowHeight
    ) {
      // decrease height by 2 pixels each times we cross
      // the height threshold
      // 1 px is smoother but needs more updates
      // 3 px jump gives choppier change
      let newHeight = widgetDimensions.height - 2;
      newHeight =
        newHeight < DEFAULT_WIDGET_DIMENSIONS.MIN[1]
          ? DEFAULT_WIDGET_DIMENSIONS.MIN[1]
          : newHeight;
      setWidgetDimensions({ ...widgetDimensions, height: newHeight });
      dispatch(setWidgetHeightInRedux({ height: newHeight }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    windowHeight,
    widgetDimensions.height,
    bodyResizeObserver.blockSize,
    widgetInitialHeight
  ]);

  // intialise redux
  useEffect(() => {
    dispatch(setWidgetHeightInRedux({ height: widgetDimensions.height }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Draggable
      ref={widgetRef}
      handle=".drag-handle"
      isBodyBounded
      onDrag={onDrag}
      position={widgetPosition}
    >
      <div
        ref={widgetRef}
        className={'border-base-200 absolute top-0 z-10 overflow-hidden rounded-md border bg-white transform-gpu drop-shadow-lg'.concat(
          widgetPosition ? '' : ' hidden'
        )}
      >
        <Resizable
          className="relative z-10 flex flex-col items-center overflow-hidden"
          handle={(__resizeHandleAxis, ref) => (
            <div
              className="bg-base-200 absolute bottom-0 left-1/2 z-10 mb-1 h-1 w-16 -translate-x-1/2 rounded-3xl hover:cursor-s-resize"
              ref={ref}
            />
          )}
          width={DEFAULT_WIDGET_DIMENSIONS.INITIAL_WIDTH}
          height={widgetDimensions.height}
          onResize={onResize}
          resizeHandles={DEFAULT_RESIZE_HANDLE}
          minConstraints={DEFAULT_WIDGET_DIMENSIONS.MIN}
          maxConstraints={[DEFAULT_WIDGET_DIMENSIONS.MAX[0], windowHeight]}
        >
          <div
            className="h-auto w-full overflow-hidden bg-white"
            style={{ height: `${widgetDimensions.height}px` }}
          >
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

DraggableResizable.propTypes = {
  children: PropTypes.node,
  position: PropTypes.string.isRequired,
  positionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
DraggableResizable.defaultProps = {
  children: null,
  positionRef: null
};

export default DraggableResizable;
