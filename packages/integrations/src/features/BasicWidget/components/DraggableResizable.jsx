import React, { useRef } from 'react';
import { Draggable, Resizable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const DraggableResizable = ({ children }) => {
  const widgetRef = useRef(null);

  return (
    <Draggable ref={widgetRef} handle=".drag-handle">
      <div ref={widgetRef} className="absolute">
        <Resizable
          className="border-base-200 relative rounded-md border border-solid"
          handle={(__resizeHandleAxis, ref) => (
            <span
              className="bg-base-200 absolute bottom-0 left-1/2 mb-1 h-1 w-20 -translate-x-1/2 -translate-y-1/2 rounded-3xl hover:cursor-s-resize"
              ref={ref}
            />
          )}
          width={300}
          height={250}
          resizeHandles={['s']}
          minConstraints={[300, 200]}
          maxConstraints={[300, 500]}
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
