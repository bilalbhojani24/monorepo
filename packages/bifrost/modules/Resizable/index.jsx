import React, { useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import PropTypes from 'prop-types';

const ResizableWrapper = ({
  children,
  handle,
  className,
  width,
  height,
  resizeHandles,
  minConstraints,
  maxConstraints,
  handleSize,
  onResize,
  onResizeStart,
  onResizeStop
}) => {
  const resizeRef = useRef(null);
  const onResizeStartCallback = (...props) => {
    if (!handle && resizeRef.current) resizeRef.current.style.opacity = 1;
    onResizeStart?.(...props);
  };
  const onResizeStopCallback = (...props) => {
    if (!handle) resizeRef?.current?.removeAttribute('style');
    onResizeStop?.(...props);
  };

  const defaultHandleProps = (__resizeHandleAxis, ref) => (
    <span
      className={
        ('group absolute left-0 top-0 h-full px-1 hover:cursor-col-resize',
        {
          '-translate-x-1.5': resizeHandles.includes('w'),
          'translate-x-1.5': resizeHandles.includes('e')
        })
      }
      ref={ref}
    >
      <span
        className="bg-brand-600 block h-full w-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ref={resizeRef}
      />
    </span>
  );

  return (
    <ResizableBox
      className={className}
      width={width}
      height={height}
      handle={handle || defaultHandleProps}
      handleSize={handleSize}
      resizeHandles={resizeHandles}
      minConstraints={minConstraints}
      maxConstraints={maxConstraints}
      onResize={onResize}
      onResizeStart={onResizeStartCallback}
      onResizeStop={onResizeStopCallback}
    >
      {children}
    </ResizableBox>
  );
};

ResizableWrapper.propTypes = {
  children: PropTypes.node,
  handle: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  resizeHandles: PropTypes.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']),
  maxConstraints: PropTypes.arrayOf(PropTypes.number),
  minConstraints: PropTypes.arrayOf(PropTypes.number),
  handleSize: PropTypes.arrayOf(PropTypes.number),
  onResize: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResizeStop: PropTypes.func
};

ResizableWrapper.defaultProps = {
  children: null,
  handle: null,
  className: '',
  width: null,
  height: null,
  resizeHandles: null,
  maxConstraints: null,
  minConstraints: null,
  handleSize: null,
  onResize: null,
  onResizeStart: null,
  onResizeStop: null
};

export default ResizableWrapper;
