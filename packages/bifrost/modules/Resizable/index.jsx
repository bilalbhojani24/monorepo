import React, { useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import { twClassNames } from '@browserstack/utils';
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
      className={twClassNames('group absolute', {
        'px-1 top-0 h-full left-0 -translate-x-1.5 hover:cursor-col-resize':
          resizeHandles.includes('w'),
        'px-1 top-0 h-full right-0 translate-x-1.5 hover:cursor-col-resize':
          resizeHandles.includes('e'),
        'py-1 bottom-0 h-1 left-0 w-full translate-y-1 hover:cursor-row-resize':
          resizeHandles.includes('s'),
        'py-1 top-0 h-1 left-0 w-full -translate-y-1 hover:cursor-row-resize':
          resizeHandles.includes('n')
      })}
      ref={ref}
    >
      <span
        className={twClassNames(
          'bg-brand-600 block opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          {
            'w-0.5 h-full':
              resizeHandles.includes('e') || resizeHandles.includes('w'),
            'w-full h-0.5':
              resizeHandles.includes('s') || resizeHandles.includes('n')
          }
        )}
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
