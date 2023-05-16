import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdClose } from '../Icon';

import {
  CLOSE_BUTTON_SIZES,
  FEATURE_FENCING_SIZES,
  WIDTH_STYLES
} from './const';
import { FEATURE_FENCING_CONTEXT } from './context';

const CTACard = (props) => {
  const { children, isDismissable, onClose } = props;

  return (
    <FEATURE_FENCING_CONTEXT.Provider
      value={{ size: FEATURE_FENCING_SIZES.BASE }}
    >
      <div
        className={twClassNames(
          'relative flex shadow overflow-hidden',
          WIDTH_STYLES[FEATURE_FENCING_SIZES.BASE],
          'rounded-lg'
        )}
      >
        {children}
        {isDismissable && (
          <Button
            wrapperClassName={twClassNames(
              'absolute top-0 right-0',

              'top-3 right-4'
            )}
            isIconOnlyButton
            size={CLOSE_BUTTON_SIZES[FEATURE_FENCING_SIZES.BASE]}
            icon={<MdClose className="h-full w-full" />}
            colors="white"
            onClick={onClose}
          />
        )}
      </div>
    </FEATURE_FENCING_CONTEXT.Provider>
  );
};

CTACard.propTypes = {
  isDismissable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func
};
CTACard.defaultProps = {
  isDismissable: false,
  onClose: () => {}
};

export default CTACard;
