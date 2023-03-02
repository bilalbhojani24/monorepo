import React from 'react';
import { ResizableBox } from 'react-resizable';
import PropTypes from 'prop-types';

import { RESIZE_HANDLE_AXES } from './const/resizableConstants';

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
  ...rest
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
    { ...rest }
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
  resizeHandles: PropTypes.oneOf(RESIZE_HANDLE_AXES),
  maxConstraints: PropTypes.arrayOf(PropTypes.number),
  minConstraints: PropTypes.arrayOf(PropTypes.number),
  handleSize: PropTypes.arrayOf(PropTypes.number)
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
  handleSize: null
};

export default ResizableWrapper;
