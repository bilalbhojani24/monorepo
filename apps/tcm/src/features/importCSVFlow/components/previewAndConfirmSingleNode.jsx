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
        'text-sm text-base-500 font-medium mb-1',
        textWrapperClassName
      )}
    >
      {text}
    </div>
    <div
      className={twClassNames(
        'text-sm text-base-900 flex font-normal flex-col w-full',
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
