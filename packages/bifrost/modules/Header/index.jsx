import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({ children, wrapperClassName }) => (
  <nav
    className={twClassNames(
      'h-16 w-auto flex flex-row items-center p-0 bg-base-800 gap-4',
      wrapperClassName
    )}
  >
    {children}
  </nav>
);

Header.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
Header.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default Header;
