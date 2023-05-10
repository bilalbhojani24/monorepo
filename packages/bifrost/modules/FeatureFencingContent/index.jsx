import React from 'react';
import PropTypes from 'prop-types';

const FeatureFencingContent = ({ children, header, description }) => (
  <div className="">
    <p className="">{header}</p>
    <p className="">{description}</p>
    <div className="">{children}</div>
  </div>
);

FeatureFencingContent.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FeatureFencingContent;
