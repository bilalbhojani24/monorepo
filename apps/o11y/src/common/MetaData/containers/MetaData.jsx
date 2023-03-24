import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span'
};

const renderIcon = (icon, iconProps) =>
  icon
    ? cloneElement(icon, {
        ...iconProps,
        fontSize: 'inherit'
      })
    : null;

const MetaData = ({ icon, label, symbol, title, variant }) => {
  const Component = variantsMapping[variant];
  return (
    <>
      <Component
        className="inline-flex items-center text-xs leading-5"
        title={title || label}
      >
        {icon
          ? renderIcon(icon, {
              className: 'text-xs mr-1',
              fontSize: 'inherit'
            })
          : null}
        {!!symbol && <span className="mr-1 text-xs">{symbol}</span>}
        {label}
      </Component>
    </>
  );
};

MetaData.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  symbol: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.string
};
MetaData.defaultProps = {
  icon: null,
  symbol: '',
  title: '',
  variant: 'span'
};

export default MetaData;
