import React from 'react';
import { Link } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const Hyperlink = (props) => {
  const {
    children,
    href,
    onClick,
    rel,
    wrapperClassName,
    target,
    isCSR,
    ...args
  } = props;

  const appliedRel = target === '_blank' ? `${rel} noopener noreferrer` : rel;

  const defaultClasses = 'flex items-center text-brand-600 text-base';

  if (isCSR) {
    return (
      <Link
        to={href}
        className={twClassNames(defaultClasses, wrapperClassName)}
        target={target}
        rel={appliedRel}
        onClick={(e) => {
          onClick?.(e);
        }}
        {...args}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href || '#'}
      rel={appliedRel}
      className={twClassNames(defaultClasses, wrapperClassName)}
      onClick={(e) => {
        onClick?.(e);
      }}
      target={target}
      {...args}
    >
      {children}
    </a>
  );
};

Hyperlink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  isCSR: PropTypes.bool,
  onClick: PropTypes.func,
  rel: PropTypes.string,
  wrapperClassName: PropTypes.string,
  target: PropTypes.string
};
Hyperlink.defaultProps = {
  children: null,
  onClick: null,
  href: '#',
  isCSR: false,
  rel: '',
  wrapperClassName: '',
  target: ''
};

export default Hyperlink;
