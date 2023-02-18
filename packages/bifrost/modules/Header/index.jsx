import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({ headerID, children, wrapperClassName }) => (
  <nav
    className={twClassNames(
      'h-16 w-auto flex flex-row items-center p-0 bg-base-800 gap-4',
      wrapperClassName
    )}
    id={headerID || null}
  >
    {children}
  </nav>
);

Header.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string,
  headerID: PropTypes.string
};
Header.defaultProps = {
  children: null,
  wrapperClassName: '',
  headerID: ''
};

export default Header;
