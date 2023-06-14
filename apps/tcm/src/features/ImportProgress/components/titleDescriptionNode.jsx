import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TitleDescriptionNode = ({
  title,
  description,
  wrapperClassName,
  titleClassName,
  descClassName
}) => (
  <div className={twClassNames(wrapperClassName)}>
    <div
      className={twClassNames(
        'text-sm font-medium text-base-500',
        titleClassName
      )}
    >
      {title}
    </div>
    <div
      className={twClassNames(
        'text-sm font-normal text-base-900',
        descClassName
      )}
    >
      {description}
    </div>
  </div>
);

TitleDescriptionNode.propTypes = {
  title: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  description: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  wrapperClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  descClassName: PropTypes.string
};

TitleDescriptionNode.defaultProps = {
  title: '',
  description: '',
  wrapperClassName: '',
  titleClassName: '',
  descClassName: ''
};

export default TitleDescriptionNode;
