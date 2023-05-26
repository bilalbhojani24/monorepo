import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FEATURE_FENCING_SIZES } from '../CTACard/const';
import { useCTACardContext } from '../CTACard/utils';

import {
  CTA_BUTTON_SIZES
  // FEATURE_FENCING_ACTIONS_ALIGNMENT
} from './const';

const CTACardActions = (props) => {
  const {
    // alignment,
    primaryBtnText,
    secondaryBtnText,
    primaryBtnProps,
    secondaryBtnProps,
    onPrimayBtnClick,
    onSecondaryBtnClick
  } = props;

  const { size } = useCTACardContext();

  return (
    <div
      className={twClassNames('flex items-center', {
        // 'justify-center':
        //   alignment === FEATURE_FENCING_ACTIONS_ALIGNMENT.CENTER,
        // 'justify-start': alignment === FEATURE_FENCING_ACTIONS_ALIGNMENT.LEFT,

        'gap-6': size === FEATURE_FENCING_SIZES.BASE
      })}
    >
      <Button
        {...primaryBtnProps}
        onClick={onPrimayBtnClick}
        size={CTA_BUTTON_SIZES[size]}
      >
        {primaryBtnText}
      </Button>
      {secondaryBtnText && (
        <Button
          {...{ variant: 'minimal', colors: 'white', ...secondaryBtnProps }}
          onClick={onSecondaryBtnClick}
          size={CTA_BUTTON_SIZES[size]}
        >
          {secondaryBtnText}
        </Button>
      )}
    </div>
  );
};
CTACardActions.propTypes = {
  // alignment: PropTypes.oneOf(Object.values(FEATURE_FENCING_ACTIONS_ALIGNMENT)),
  primaryBtnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  secondaryBtnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  primaryBtnProps: PropTypes.shape(Button.propTypes),
  secondaryBtnProps: PropTypes.shape(Button.propTypes),
  onPrimayBtnClick: PropTypes.func.isRequired,
  onSecondaryBtnClick: PropTypes.func
};

CTACardActions.defaultProps = {
  secondaryBtnText: null,
  primaryBtnProps: {},
  secondaryBtnProps: {},
  onSecondaryBtnClick: () => {}
  // alignment: FEATURE_FENCING_ACTIONS_ALIGNMENT.LEFT
};

export default CTACardActions;
