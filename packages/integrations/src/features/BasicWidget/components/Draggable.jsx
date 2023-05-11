import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from '@browserstack/bifrost';
import { useResizeObserver } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { DEFAULT_WIDGET_DIMENSIONS } from '../constants';

import { getWidgetRenderPosition } from './helpers';

const DraggableContainer = ({ children, position, positionRef }) => {
  const widgetRef = useRef(null);
  const bodyRef = useRef(document.body);
  const bodyResizeObserver = useResizeObserver(bodyRef);
  const widgetResizeObserver = useResizeObserver(widgetRef);
  const windowHeight = document.body.getBoundingClientRect().height - 8;
  const windowWidth = document.body.getBoundingClientRect().width - 8;
  const [refAquired, setRefAquired] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(null);
  const [widgetDimensions, setWidgetDimensions] = useState({
    height: 0,
    width: 0
  });

  // looks at width and heightrelated changes of the container so that
  // widget renders properly with the body
  useEffect(() => {
    const widgetRect = widgetRef.current?.getBoundingClientRect() || {};
    let { height, width } = widgetRect;
    width =
      width < DEFAULT_WIDGET_DIMENSIONS.MIN[0]
        ? DEFAULT_WIDGET_DIMENSIONS.MIN[0]
        : height;
    height =
      height < DEFAULT_WIDGET_DIMENSIONS.MIN[1]
        ? DEFAULT_WIDGET_DIMENSIONS.MIN[1]
        : height;

    setWidgetDimensions({ height, width });
  }, [widgetResizeObserver]);

  useEffect(() => {
    setRefAquired(true);
  }, []);
  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (refAquired && widgetRef.current) {
      const pos = getWidgetRenderPosition(
        position,
        positionRef?.current?.getBoundingClientRect(),
        widgetRef.current?.getBoundingClientRect()
      );
      let { y } = pos;

      // is widget going out of screen?
      if (y + widgetDimensions.height >= windowHeight) {
        const overflowY = y + widgetDimensions.height - windowHeight;
        y = y - overflowY > 8 ? y - overflowY : 8;
      }

      setWidgetPosition((prev) => {
        const xVal = prev && prev.x < pos.x ? prev.x : pos.x;
        const yVal = prev && prev.y < y ? prev.y : y;
        return {
          x: xVal < 8 ? 8 : xVal,
          y: yVal < 8 ? 8 : yVal
        };
      });
    }
  }, [
    position,
    positionRef,
    refAquired,
    windowWidth,
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

  return (
    <Draggable
      ref={widgetRef}
      handle=".drag-handle"
      isBodyBounded
      position={widgetPosition}
      onDrag={onDrag}
    >
      <div
        ref={widgetRef}
        className={'border-base-200 absolute top-0 z-10 flex flex-col overflow-hidden rounded-md border border-solid transform-gpu drop-shadow-lg'.concat(
          widgetPosition ? '' : ' hidden'
        )}
        style={{
          width: DEFAULT_WIDGET_DIMENSIONS.INITIAL_WIDTH,
          minHeight: DEFAULT_WIDGET_DIMENSIONS.MIN[1],
          maxHeight: DEFAULT_WIDGET_DIMENSIONS.MAX[1]
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

DraggableContainer.propTypes = {
  children: PropTypes.node,
  position: PropTypes.string.isRequired,
  positionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
DraggableContainer.defaultProps = {
  children: null,
  positionRef: null
};

export default DraggableContainer;
