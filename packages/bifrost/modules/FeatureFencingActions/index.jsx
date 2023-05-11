import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';

import { CTA_BUTTON_SIZES, FEATURE_FENCING_ACTIONS_ALIGNMENT } from './const';

const FeatureFencingActions = (props) => {
  const {
    alignment,
    primaryBtnText,
    secondaryBtnText,
    primaryBtnProps,
    secondaryBtnProps,
    onPrimayBtnClick,
    onSecondaryBtnClick,
    actionText,
    showActionTextOnly
  } = props;

  const { size } = useFeatureFencingContext();

  return (
    <div
      className={twClassNames('flex items-center', {
        'justify-center':
          alignment === FEATURE_FENCING_ACTIONS_ALIGNMENT.CENTER,
        'justify-start': alignment === FEATURE_FENCING_ACTIONS_ALIGNMENT.LEFT,

        'gap-6':
          size === FEATURE_FENCING_SIZES.SM ||
          size === FEATURE_FENCING_SIZES.BASE,
        'gap-9': size === FEATURE_FENCING_SIZES.XL
      })}
    >
      {!showActionTextOnly && (
        <>
          <Button
            {...primaryBtnProps}
            onClick={onPrimayBtnClick}
            size={CTA_BUTTON_SIZES[size]}
          >
            {primaryBtnText}
          </Button>
          {secondaryBtnText && (
            <Button
              {...secondaryBtnProps}
              onClick={onSecondaryBtnClick}
              size={CTA_BUTTON_SIZES[size]}
            >
              {secondaryBtnText}
            </Button>
          )}
        </>
      )}
      {showActionTextOnly && <>{actionText}</>}
    </div>
  );
};
FeatureFencingActions.propTypes = {
  alignment: PropTypes.oneOf(Object.values(FEATURE_FENCING_ACTIONS_ALIGNMENT)),
  primaryBtnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  secondaryBtnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  primaryBtnProps: PropTypes.shape(Button.propTypes),
  secondaryBtnProps: PropTypes.shape(Button.propTypes),
  onPrimayBtnClick: PropTypes.func.isRequired,
  onSecondaryBtnClick: PropTypes.func,
  actionText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showActionTextOnly: PropTypes.bool
};

FeatureFencingActions.defaultProps = {
  secondaryBtnText: null,
  primaryBtnProps: {},
  secondaryBtnProps: {},
  onSecondaryBtnClick: () => {},
  alignment: FEATURE_FENCING_ACTIONS_ALIGNMENT.LEFT,
  actionText: '',
  showActionTextOnly: false
};

export default FeatureFencingActions;
