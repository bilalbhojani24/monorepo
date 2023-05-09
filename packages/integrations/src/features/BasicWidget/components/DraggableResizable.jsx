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
  // additional 16 px space for easy access to grab and use resize handle
  const bodyRef = useRef(document.body);
  const bodyResizeObserver = useResizeObserver(bodyRef);
  const windowHeight = document.body.getBoundingClientRect().height - 16;
  const windowWidth = document.body.getBoundingClientRect().width - 16;

  // initial widget height should be 90% of the window height
  // multiply by 0.9 to get 90% of the windowHeight
  const widgetInitialHeight =
    windowHeight * 0.9 < DEFAULT_WIDGET_DIMENSIONS.MIN[1]
      ? DEFAULT_WIDGET_DIMENSIONS.MIN[1]
      : windowHeight * 0.9;
  const [widgetHeight, setWidgetHeight] = useState(widgetInitialHeight);
  const [refAquired, setRefAquired] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(null);

  useEffect(() => {
    setRefAquired(true);
  }, []);

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
      if (y + widgetRefClientRect.height > windowHeight) {
        const overflowY = y + widgetRefClientRect.height - windowHeight;
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
    dispatch,
    position,
    refAquired,
    windowWidth,
    positionRef,
    windowHeight,
    bodyResizeObserver.inlineSize,
    widgetHeight
  ]);

  const onDrag = (__, { x, y }) => {
    setWidgetPosition({
      x,
      y
    });
  };

  const onResize = (__, { size }) => {
    setWidgetHeight(size.height);
    dispatch(setWidgetHeightInRedux({ height: size.height }));
  };

  useEffect(() => {
    if (widgetPosition && widgetPosition.y + widgetHeight > windowHeight) {
      let newHeight = widgetHeight - 2;
      newHeight =
        newHeight < DEFAULT_WIDGET_DIMENSIONS.MIN[1]
          ? DEFAULT_WIDGET_DIMENSIONS.MIN[1]
          : newHeight;
      setWidgetHeight(newHeight);
      dispatch(setWidgetHeightInRedux({ height: newHeight }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    widgetHeight,
    windowHeight,
    bodyResizeObserver,
    widgetInitialHeight
  ]);

  // intialise redux
  useEffect(() => {
    dispatch(setWidgetHeightInRedux({ height: widgetHeight }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Draggable
      className={''.concat(widgetPosition ? '' : 'hidden')}
      ref={widgetRef}
      handle=".drag-handle"
      isBodyBounded
      onDrag={onDrag}
      position={widgetPosition}
    >
      <div
        ref={widgetRef}
        className="border-base-200 absolute top-0 z-10 overflow-hidden rounded-md border bg-white drop-shadow-lg"
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
          height={widgetHeight}
          onResize={onResize}
          resizeHandles={DEFAULT_RESIZE_HANDLE}
          minConstraints={DEFAULT_WIDGET_DIMENSIONS.MIN}
          maxConstraints={[DEFAULT_WIDGET_DIMENSIONS.MAX[0], windowHeight]}
        >
          <div
            className="h-auto w-full overflow-hidden bg-white"
            style={{ height: `${widgetHeight}px` }}
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
