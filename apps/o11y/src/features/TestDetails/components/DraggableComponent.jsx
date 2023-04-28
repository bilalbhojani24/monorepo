import React, { useRef } from 'react';
import { MdClose, MdDragHandle } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useDraggable from '../hooks/useDraggable';

const DraggableComponent = ({
  children,
  className,
  closeFloatingVideo,
  style
}) => {
  const ref = useRef(null);
  useDraggable(ref);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex="-1"
      className={`fixed top-0 right-0 z-50 overflow-hidden rounded drop-shadow-2xl ${className}`}
      style={style}
    >
      <div className="flex items-center bg-white">
        <div className="flex flex-1 items-center justify-center">
          <MdDragHandle />
        </div>
        <button
          className="p-2"
          onClick={closeFloatingVideo}
          type="button"
          tabIndex="-1"
        >
          <MdClose />
        </button>
      </div>
      {children}
    </div>
  );
};

DraggableComponent.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node.isRequired,
  closeFloatingVideo: PropTypes.func.isRequired,
  className: PropTypes.string
};

DraggableComponent.defaultProps = {
  className: '',
  style: {}
};

export default DraggableComponent;
