import React, { useMemo, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdClose } from '../Icon';

import { FEATURE_FENCING_SIZES, WIDTH_STYLES } from './const';
import { FEATURE_FENCING_CONTEXT } from './context';

const FeatureFencing = (props) => {
  const { children, isDismissable, size } = props;

  const [hasMediaNode, setHasMediaNode] = useState(false);

  const closeButtonSize = useMemo(() => {
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
        setHasMediaNode
      }}
    >
      <div className={twClassNames('relative flex shadow', WIDTH_STYLES[size])}>
        {children}
        {isDismissable && (
          <Button
            wrapperClassName={twClassNames('absolute top-0 right-0', {
              '': hasMediaNode
            })}
            isIconOnlyButton
            size={closeButtonSize}
            icon={<MdClose className="h-full w-full" />}
          />
        )}
      </div>
    </FEATURE_FENCING_CONTEXT.Provider>
  );
};

FeatureFencing.propTypes = {
  isDismissable: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(FEATURE_FENCING_SIZES)),
  children: PropTypes.node.isRequired
};
FeatureFencing.defaultProps = {
  isDismissable: true,
  size: FEATURE_FENCING_SIZES.SM
};

export default FeatureFencing;
