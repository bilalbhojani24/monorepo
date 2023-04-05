import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { DEFAULT_WIDGET_DIMENSIONS } from '../constants';

import { getWidgetRenderPosition } from './helpers';

const DraggableContainer = ({ children, position, positionRef }) => {
  const widgetRef = useRef(null);
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

  return (
    <Draggable
      ref={widgetRef}
      handle=".drag-handle"
      isBodyBounded
      position={widgetPosition}
    >
      <div
        ref={widgetRef}
        className={'border-base-200 absolute left-2/4 top-2/4 flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md border border-solid drop-shadow-lg'.concat(
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
