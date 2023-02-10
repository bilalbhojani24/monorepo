import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const SlideoverBody = ({
  disableDefaultPadding,
  disableFullHeight,
  children
}) => (
  <div
    className={twClassNames(`overflow-scroll`, {
      'py-4': !disableDefaultPadding,
      'flex-1': !disableFullHeight
    })}
  >
    {children}
  </div>
);

SlideoverBody.propTypes = {
  children: PropTypes.node,
  disableDefaultPadding: PropTypes.bool,
  disableFullHeight: PropTypes.bool
};
SlideoverBody.defaultProps = {
  children: null,
  disableDefaultPadding: false,
  disableFullHeight: false
};

export default SlideoverBody;
