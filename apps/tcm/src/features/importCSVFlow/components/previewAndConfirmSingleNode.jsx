import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const PreviewAndConfirmSingleNode = ({
  text,
  description,
  wrapperClassName,
  textWrapperClassName,
  descWrapperClassName
}) => (
  <div className={twClassNames(wrapperClassName)}>
    <div
      className={twClassNames(
        'text-sm text-base-500 font-normal',
        textWrapperClassName
      )}
    >
      {text}
    </div>
    <div
      className={twClassNames(
        'text-sm text-base-900 flex items-center font-normal',
        descWrapperClassName
      )}
    >
      {description}
    </div>
  </div>
);

PreviewAndConfirmSingleNode.propTypes = {
  text: PropTypes.string,
  description: PropTypes.oneOf(PropTypes.string, PropTypes.node),
  descWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  textWrapperClassName: PropTypes.string
};

PreviewAndConfirmSingleNode.defaultProps = {
  text: '',
  description: '',
  descWrapperClassName: '',
  wrapperClassName: '',
  textWrapperClassName: ''
};

export default PreviewAndConfirmSingleNode;
