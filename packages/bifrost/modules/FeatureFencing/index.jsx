import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdClose } from '../Icon';

import { FEATURE_FENCING_SIZES } from './const';
import { FEATURE_FENCING_CONTEXT } from './context';

const FeatureFencing = (props) => {
  const {
    children,
    // isDismissable,
    size,
    header,
    description
  } = props;

  // const [hasMediaNode, setHasMediaNode] = useState(false);

  const buttonSize = useMemo(() => {
    switch (size) {
      case FEATURE_FENCING_SIZES.BASE:
      case FEATURE_FENCING_SIZES.SM:
        return 'extra-small';
      default:
        return 'extra-large';
    }
  }, [size]);

  return (
    <FEATURE_FENCING_CONTEXT.Provider
      value={{
        size,
        header,
        description
        // setHasMediaNode
      }}
    >
      <div className="relative h-20 shadow">
        {children}
        <Button
          wrapperClassName="absolute top-0 right-0"
          isIconOnlyButton
          size={buttonSize}
          icon={<MdClose className="h-full w-full" />}
        />
      </div>
    </FEATURE_FENCING_CONTEXT.Provider>
  );
};

FeatureFencing.propTypes = {
  // isDismissable: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(FEATURE_FENCING_SIZES)),
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
FeatureFencing.defaultProps = {
  // isDismissable: false,
  size: FEATURE_FENCING_SIZES.SM
};

export default FeatureFencing;

/* <FeatureFencing header={} description={} isDismissable={true} size={"sm"} wrapperClassName="">
  <FeatureFencingMedia wrapperClassName="">

  </FeatureFencingMedia>
  <FeatureFencingActions
    ctaBtnText=""
    ctaBtnWrapperClassName=""
    wrapperClassName=""
    alignment=""
    learnMoreLink=""
    onCtaClick=""
    onLearnMoreClick=""
  />
  <FeatureFencingActionSubText wrapperClassName="">
    Successfully trail
  </FeatureFencingActionSubText>
</FeatureFencing> */
