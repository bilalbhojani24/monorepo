import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Resizable } from '@browserstack/bifrost';
import { useResizeObserver } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { setWidgetHeight as setWidgetHeightInRedux } from '../../slices/widgetSlice';
import { DEFAULT_RESIZE_HANDLE, DEFAULT_WIDGET_DIMENSIONS } from '../constants';

import { getWidgetRenderPosition } from './helpers';

const DraggableResizable = ({ children, childRef, position, positionRef }) => {
  const dispatch = useDispatch();
  const widgetRef = useRef(null);
  const [widgetHeight, setWidgetHeight] = useState(
    DEFAULT_WIDGET_DIMENSIONS.MAX[1]
  );
  const [refAquired, setRefAquired] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    setRefAquired(true);
  }, []);

  useEffect(() => {
    if (refAquired && widgetRef.current) {
      const [x, y] = getWidgetRenderPosition(
        position,
        positionRef?.current?.getBoundingClientRect(),
        widgetRef.current?.getBoundingClientRect()
      );
      setWidgetPosition({
        x,
        y
      });
    }
  }, [refAquired]);

  useEffect(() => {
    setWidgetPosition(null);
    setShowWidget(true);
  }, [widgetPosition]);

  const onResize = (__, { size }) => {
    setWidgetHeight(size.height);
    dispatch(setWidgetHeightInRedux({ height: size.height }));
  };

  // intialise redux
  useEffect(() => {
    dispatch(setWidgetHeightInRedux({ height: widgetHeight }));
  }, []);

  return (
    <Draggable
      className={''.concat(showWidget ? '' : 'hidden')}
      ref={widgetRef}
      handle=".drag-handle"
      isBodyBounded
      position={widgetPosition}
    >
      <div
        ref={widgetRef}
        className="border-base-200 absolute z-10 overflow-hidden rounded-md border bg-white drop-shadow-lg"
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
          maxConstraints={DEFAULT_WIDGET_DIMENSIONS.MAX}
        >
          <div
            className="h-auto w-full bg-white"
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
  childRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  position: PropTypes.string.isRequired,
  positionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
DraggableResizable.defaultProps = {
  children: null,
  childRef: null,
  positionRef: null
};

export default DraggableResizable;
