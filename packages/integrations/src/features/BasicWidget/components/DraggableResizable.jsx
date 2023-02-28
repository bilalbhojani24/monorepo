import React, { useRef } from 'react';
import { Draggable, Resizable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { DEFAULT_RESIZE_HANDLE, DEFAULT_WIDGET_DIMENSIONS } from '../constants';

const DraggableResizable = ({ children }) => {
  const widgetRef = useRef(null);

  return (
    <Draggable ref={widgetRef} handle=".drag-handle">
      <div ref={widgetRef} className="absolute">
        <Resizable
          className="border-base-200 relative flex flex-col overflow-hidden rounded-md border border-solid"
          handle={(__resizeHandleAxis, ref) => (
            <span
              className="bg-base-200 relative bottom-0 left-1/2 mb-1 h-1 w-20 -translate-x-1/2 -translate-y-1/2 rounded-3xl hover:cursor-s-resize"
              ref={ref}
            />
          )}
          width={DEFAULT_WIDGET_DIMENSIONS.INITIAL_WIDTH}
          height={DEFAULT_WIDGET_DIMENSIONS.INITIAL_HEIGHT}
          resizeHandles={DEFAULT_RESIZE_HANDLE}
          minConstraints={DEFAULT_WIDGET_DIMENSIONS.MIN}
          maxConstraints={DEFAULT_WIDGET_DIMENSIONS.MAX}
        >
          {children}
        </Resizable>
      </div>
    </Draggable>
  );
};

DraggableResizable.propTypes = {
  children: PropTypes.node
};
DraggableResizable.defaultProps = {
  children: null
};

export default DraggableResizable;
