import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Hyperlink = (props) => {
  const { children, href, onClick, rel, wrapperClassName, target } = props;

  const appliedRel = target === '_blank' ? `${rel} noopener noreferrer` : rel;

  return (
    <a
      href={href || '#'}
      rel={appliedRel}
      className={twClassNames(
        'flex items-center text-brand-600 text-base font-black',
        wrapperClassName
      )}
      onClick={(e) => {
        onClick?.(e);
      }}
      target={target}
    >
      {children}
    </a>
  );
};

Hyperlink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  rel: PropTypes.string,
  wrapperClassName: PropTypes.string,
  target: PropTypes.string
};
Hyperlink.defaultProps = {
  children: null,
  onClick: null,
  href: '#',
  rel: '',
  wrapperClassName: '',
  target: ''
};

export default Hyperlink;
