import React, { forwardRef, useState } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import './styles.scss';

const DraggableWrapper = (
  {
    children,
    isBodyBounded,
    bounds,
    handle,
    initialPosition,
    position,
    onDrag,
  },
  nodeRef
) => {
  const [activeDrags, setActiveDrags] = useState(0);
  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };
  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  return (
    <Draggable
      onStart={onStart}
      onStop={onStop}
      bounds={isBodyBounded ? 'body' : bounds}
      handle={handle}
      defaultPosition={initialPosition}
      position={position}
      nodeRef={nodeRef}
      onDrag={onDrag}
    >
      {children}
    </Draggable>
  );
};

DraggableWrapper.propTypes = {
  children: PropTypes.node,
  isBodyBounded: PropTypes.bool,
  bounds: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  handle: PropTypes.string,
  initialPosition: PropTypes.objectOf({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  position: PropTypes.objectOf({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onDrag: PropTypes.func,
};

DraggableWrapper.defaultProps = {
  children: null,
  isBodyBounded: false,
  bounds: false,
  handle: null,
  initialPosition: { x: 0, y: 0 },
  position: null,
  onDrag: null,
};

export default forwardRef(DraggableWrapper);
