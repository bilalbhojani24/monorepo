import React from 'react';
import { ResizableBox } from 'react-resizable';
import PropTypes from 'prop-types';

import './styles.scss';

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
}) => (
  <ResizableBox
    className={className}
    width={width}
    height={height}
    handle={handle}
    handleSize={handleSize}
    resizeHandles={resizeHandles}
    minConstraints={minConstraints}
    maxConstraints={maxConstraints}
    onResize={onResize}
    onResizeStart={onResizeStart}
    onResizeStop={onResizeStop}
  >
    {children}
  </ResizableBox>
);

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
