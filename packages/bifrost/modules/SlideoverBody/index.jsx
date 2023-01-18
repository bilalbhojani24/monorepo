import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SlideoverBody = ({ children }) => <>{children}</>;

SlideoverBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlideoverBody;
