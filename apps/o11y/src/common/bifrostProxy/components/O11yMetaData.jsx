import React from 'react';
import { Metadata } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const O11yMetaData = ({ icon, label, title, wrapperClassName }) => (
  <Metadata
    icon={icon}
    metaDescription={label}
    metaTitle={title}
    textColorClass={twClassNames(`text-base-500 inline-flex`, wrapperClassName)}
  />
);

O11yMetaData.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string,
  wrapperClassName: PropTypes.string
};
O11yMetaData.defaultProps = {
  icon: null,
  title: '',
  wrapperClassName: ''
};

export default O11yMetaData;
