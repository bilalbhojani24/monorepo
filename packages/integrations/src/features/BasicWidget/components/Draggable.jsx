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
  const windowHeight = window.innerHeight;
  const [refAquired, setRefAquired] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

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
        widgetRef.current?.getBoundingClientRect()
      );
      let { y } = pos;

      // is widget going out of screen?
      if (y + widgetRefClientRect.height >= windowHeight) {
        const overflowY = y + widgetRefClientRect.height - windowHeight + 24;
        y -= overflowY;
      }
      setWidgetPosition((prev) => {
        const xVal = prev && prev.x < pos.x ? prev.x : pos.x;
        const yVal = prev?.y ? prev?.y : y;

        return {
          x: xVal < 8 ? 8 : xVal,
          y: yVal < 8 ? 8 : yVal
        };
      });
    }
  }, [position, positionRef, refAquired, windowHeight, bodyResizeObserver]);

  const onDrag = (__, { x, y }) => {
    setWidgetPosition({
      x,
      y
    });
  };

  useEffect(() => {
    setWidgetPosition(null);
    setShowWidget(true);
  }, [widgetPosition]);

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
        className={'border-base-200 absolute top-0 flex flex-col overflow-hidden rounded-md border border-solid drop-shadow-lg z-10'.concat(
          showWidget ? '' : ' hidden'
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
