import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Metadata = ({ icon, metaDescription, textColorClass, metaTitle }) => (
  <span
    title={metaTitle}
    className={twClassNames(
      'flex flex-row w-fit gap-1.5 justify-center items-center text-base-300',
      textColorClass
    )}
  >
    {icon}
    <span className={twClassNames('font-medium text-sm leading-5')}>
      {metaDescription}
    </span>
  </span>
);

Metadata.propTypes = {
  icon: PropTypes.node,
  metaDescription: PropTypes.string,
  textColorClass: PropTypes.string,
  metaTitle: PropTypes.string
};
Metadata.defaultProps = {
  icon: null,
  metaDescription: '',
  textColorClass: '',
  metaTitle: ''
};

export default Metadata;
