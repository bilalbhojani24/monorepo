import React, { useRef } from 'react';
import { Draggable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { DEFAULT_WIDGET_DIMENSIONS } from '../constants';

const DraggableContainer = ({ children }) => {
  const widgetRef = useRef(null);

  return (
    <Draggable ref={widgetRef} handle=".drag-handle" isBodyBounded>
      <div
        ref={widgetRef}
        className="border-base-200 absolute flex flex-col overflow-hidden rounded-md border border-solid drop-shadow-lg"
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
  children: PropTypes.node
};
DraggableContainer.defaultProps = {
  children: null
};

export default DraggableContainer;
