import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';
import HyperLink from '../Hyperlink';
import { MdOpenInNew } from '../Icon';

import {
  CTA_BUTTON_SIZES,
  FEATURE_FENCING_ACTIONS_ALIGNMENT,
  LEARN_MORE_TEXT_STYLES,
  OPEN_IN_NEW_ICON_STYLES
} from './const';

const FeatureFencingActions = (props) => {
  const { ctaText, alignment, learnMoreLink, onCTAClick, onLearnMoreClick } =
    props;

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
      <Button onClick={onCTAClick} size={CTA_BUTTON_SIZES[size]}>
        {ctaText}
      </Button>
      <HyperLink
        href={learnMoreLink}
        onClick={onLearnMoreClick}
        target="_blank"
        wrapperClassName="text-base-700"
      >
        <span
          className={twClassNames(
            'leading-4 font-medium',
            LEARN_MORE_TEXT_STYLES[size],
            {
              'mr-1.5':
                size === FEATURE_FENCING_SIZES.SM ||
                size === FEATURE_FENCING_SIZES.BASE,
              'mr-2': size === FEATURE_FENCING_SIZES.XL
            }
          )}
        >
          Learn more
        </span>
        <MdOpenInNew
          className={twClassNames('', OPEN_IN_NEW_ICON_STYLES[size])}
        />
      </HyperLink>
    </div>
  );
};
FeatureFencingActions.propTypes = {
  ctaText: PropTypes.string.isRequired,
  alignment: PropTypes.oneOf(Object.values(FEATURE_FENCING_ACTIONS_ALIGNMENT)),
  learnMoreLink: PropTypes.string.isRequired,
  onCTAClick: PropTypes.func,
  onLearnMoreClick: PropTypes.func
};

FeatureFencingActions.defaultProps = {
  onCTAClick: () => {},
  onLearnMoreClick: () => {},
  alignment: FEATURE_FENCING_ACTIONS_ALIGNMENT.LEFT
};

export default FeatureFencingActions;
