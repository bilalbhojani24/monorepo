import React from 'react';
import PropTypes from 'prop-types';

import ResizableWrapper from '../Resizable';

const ResizeableWrapperForSlider = ({ children }) => (
  <ResizableWrapper
    resizeHandles={['w']}
    handleSize={[(6, 1)]}
    width={512}
    minConstraints={[300]}
    maxConstraints={[900]}
    className="border-base-300 relative h-full border border-solid"
  >
    {children}
  </ResizableWrapper>
);

ResizeableWrapperForSlider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ResizeableWrapperForSlider;
