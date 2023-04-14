import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TitleDescriptionNode = ({ title, description, wrapperClassName }) => (
  <div className={twClassNames(wrapperClassName)}>
    <div>{title}</div>
    <div>{description}</div>
  </div>
);

TitleDescriptionNode.propTypes = {
  title: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  description: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  wrapperClassName: PropTypes.string
};

TitleDescriptionNode.defaultProps = {
  title: '',
  description: '',
  wrapperClassName: ''
};

export default TitleDescriptionNode;
