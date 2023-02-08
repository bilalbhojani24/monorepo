import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Hyperlink = (props) => {
  const {
    children,
    color,
    disabled,
    fontSize,
    fontWeight,
    href,
    rel,
    underlined,
    wrapperClassName
  } = props;

  return (
    <a
      href={href || '#'}
      rel={rel}
      className={twClassNames(
        'flex items-center',
        wrapperClassName,
        color,
        fontSize,
        fontWeight,
        {
          underline: underlined,
          'cursor-not-allowed': disabled
        }
      )}
    >
      {children}
    </a>
  );
};

Hyperlink.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.string,
  underlined: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
Hyperlink.defaultProps = {
  children: (
    <>
      <span aria-hidden="true"> &rarr;</span>
      View
    </>
  ),
  color: 'text-brand-600',
  disabled: false,
  fontSize: 'text-base',
  fontWeight: 'font-black',
  href: 'www.google.com',
  rel: '',
  underlined: false,
  wrapperClassName: ''
};

export default Hyperlink;
