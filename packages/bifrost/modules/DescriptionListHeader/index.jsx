import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionListHeader = ({
  heading,
  subHeading,
  isCard,
  wrapperClassName
}) => (
  <div
    className={twClassNames(
      {
        'px-6 py-5': isCard,
        'p-0': !isCard
      },
      wrapperClassName
    )}
  >
    {!!heading && (
      <h3 className="text-base-900 text-base font-semibold leading-6">
        {heading}
      </h3>
    )}
    {!!subHeading && (
      <p className="text-base-500 mt-1 max-w-2xl text-sm">{subHeading}</p>
    )}
  </div>
);

DescriptionListHeader.propTypes = {
  heading: PropTypes.node,
  isCard: PropTypes.bool.isRequired,
  subHeading: PropTypes.node,
  wrapperClassName: PropTypes.string
};

DescriptionListHeader.defaultProps = {
  heading: null,
  subHeading: null,
  wrapperClassName: ''
};

export default DescriptionListHeader;
