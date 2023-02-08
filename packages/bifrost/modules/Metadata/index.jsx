import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Metadata = ({ icon, metaDescription, textColorClass }) => (
  <>
    <div
      className={twClassNames(
        'flex flex-row w-fit gap-1.5 justify-center items-center text-base-300',
        textColorClass
      )}
    >
      {icon}
      <span className={twClassNames('font-medium text-sm leading-5')}>
        {metaDescription}
      </span>
    </div>
  </>
);

Metadata.propTypes = {
  icon: PropTypes.node,
  metaDescription: PropTypes.string,
  textColorClass: PropTypes.string
};
Metadata.defaultProps = {
  icon: null,
  metaDescription: '',
  textColorClass: ''
};

export default Metadata;
