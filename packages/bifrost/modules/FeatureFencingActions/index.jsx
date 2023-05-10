import React, { useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';
import HyperLink from '../Hyperlink';

import { FEATURE_FENCING_ACTIONS_ALIGNMENT } from './const';

const FeatureFencingActions = (props) => {
  const { ctaText, alignment, learnMoreLink, onCTAClick, onLearnMoreClick } =
    props;

  const { size } = useFeatureFencingContext();

  const ctaBtnSize = useMemo(() => {
    switch (size) {
      case FEATURE_FENCING_SIZES.SM:
        return 'extra-small';
      case FEATURE_FENCING_SIZES.BASE:
        return 'small';
      case FEATURE_FENCING_SIZES.XL:
        return 'extra-large';
      default:
        return 'extra-small';
    }
  }, [size]);

  return (
    <div
      className={twClassNames('flex items-center', {
        'justify-center':
          alignment === FEATURE_FENCING_ACTIONS_ALIGNMENT.CENTER,
        'justify-start': alignment === FEATURE_FENCING_ACTIONS_ALIGNMENT.LEFT
      })}
    >
      <Button onClick={onCTAClick} size={ctaBtnSize}>
        {ctaText}
      </Button>
      <HyperLink
        href={learnMoreLink}
        onClick={onLearnMoreClick}
        target="_blank"
        wrapperClassName=""
      >
        {learnMoreLink}
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
