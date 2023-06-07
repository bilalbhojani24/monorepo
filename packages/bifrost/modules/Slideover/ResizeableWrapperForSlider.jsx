import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import ResizableWrapper from '../Resizable';

const ResizeableWrapperForSlider = ({ children }) => {
  const resizeRef = useRef(null);
  const onResizeStart = () => {
    resizeRef.current.style.opacity = 1;
  };
  const onResizeStop = () => {
    resizeRef.current.removeAttribute('style');
  };

  const defaultHandleProps = (__resizeHandleAxis, ref) => (
    <span
      className="group absolute left-0 top-0 h-full -translate-x-1.5 px-1 hover:cursor-col-resize"
      ref={ref}
    >
      <span
        className="bg-brand-600 block h-full w-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ref={resizeRef}
      />
    </span>
  );

  return (
    <ResizableWrapper
      resizeHandles={['w']}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      handleSize={[(6, 1)]}
      width={512}
      minConstraints={[300]}
      maxConstraints={[900]}
      handle={defaultHandleProps}
      className="border-base-300 relative h-full border border-solid"
    >
      {children}
    </ResizableWrapper>
  );
};

ResizeableWrapperForSlider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ResizeableWrapperForSlider;
