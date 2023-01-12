import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const ModalBody = ({ children }) => <div className="py-5 px-6">{children}</div>;

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
