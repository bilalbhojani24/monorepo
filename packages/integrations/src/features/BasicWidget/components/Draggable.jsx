import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { DEFAULT_WIDGET_DIMENSIONS } from '../constants';

import { getWidgetRenderPosition } from './helpers';

const DraggableContainer = ({ children, position, positionRef }) => {
  const widgetRef = useRef(null);
  const windowHeight = window.innerHeight;
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
        widgetRef.current?.getBoundingClientRect()
      );
      let { y } = pos;

      // is widget going out of screen?
      if (y + widgetRefClientRect.height >= windowHeight) {
        const overflowY = y + widgetRefClientRect.height - windowHeight + 24;
        y -= overflowY;
      }
      setWidgetPosition({
        x: pos.x,
        y
      });
    }
  }, [position, positionRef, refAquired, windowHeight]);

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
    >
      <div
        ref={widgetRef}
        className={'border-base-200 absolute flex flex-col overflow-hidden rounded-md border border-solid drop-shadow-lg z-10'.concat(
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
