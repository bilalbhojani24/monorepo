import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Resizable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { setWidgetHeight as setWidgetHeightInRedux } from '../../slices/widgetSlice';
import { DEFAULT_RESIZE_HANDLE, DEFAULT_WIDGET_DIMENSIONS } from '../constants';

import { getWidgetRenderPosition } from './helpers';

const DraggableResizable = ({ children, position, positionRef }) => {
  const dispatch = useDispatch();
  const widgetRef = useRef(null);
  const windowHeight = window.innerHeight - 16;
  // initial widget height should be 70% of the window height
  const widgetInitialHeight = windowHeight * 0.7;
  const [widgetHeight, setWidgetHeight] = useState(widgetInitialHeight);
  const [refAquired, setRefAquired] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    setRefAquired(true);
  }, []);

  useEffect(() => {
    if (refAquired && widgetRef.current) {
      const widgetRefClientRect = widgetRef.current?.getBoundingClientRect();
      const pos = getWidgetRenderPosition(
        position,
        positionRef?.current?.getBoundingClientRect(),
        widgetRefClientRect
      );
      let { y } = pos;

      let newWidgetHeight = null;

      // is widget going out of screen?
      if (y + widgetRefClientRect.height > windowHeight) {
        const overflowY = y + widgetRefClientRect.height - windowHeight;

        // find the height to be adjusted
        newWidgetHeight =
          widgetRefClientRect.height - overflowY <
          DEFAULT_WIDGET_DIMENSIONS.MIN[1]
            ? DEFAULT_WIDGET_DIMENSIONS.MIN[1]
            : widgetRefClientRect.height - overflowY;

        // is widget overflowing after height adjustment?

        if (y + newWidgetHeight >= windowHeight) {
          y -= y + newWidgetHeight - windowHeight + 24;
        }
      }

      setWidgetPosition({
        x: pos.x,
        y
      });

      if (newWidgetHeight) {
        setWidgetHeight(newWidgetHeight);
        dispatch(setWidgetHeightInRedux({ height: newWidgetHeight }));
      }
    }
  }, [dispatch, position, positionRef, refAquired, windowHeight]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          maxConstraints={[DEFAULT_WIDGET_DIMENSIONS.MAX[0], windowHeight]}
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
