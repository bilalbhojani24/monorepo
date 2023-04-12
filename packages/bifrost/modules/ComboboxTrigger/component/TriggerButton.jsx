import React, { useContext, useEffect } from 'react';
import { useLatestRef } from '@browserstack/hooks';

import { ComboboxContextData } from '../../../shared/comboboxContext';
import { func } from '../../../shared/proptypesConstants';
import { ChevronUpDownIcon } from '../../Icon';

const TriggerButton = React.forwardRef(({ setIsTruncated }, ref) => {
  const setIsTruncatedRef = useLatestRef(setIsTruncated);
  const { open } = useContext(ComboboxContextData);

  useEffect(() => {
    if (ref && ref.current && !open)
      setIsTruncatedRef.current?.(
        ref.current.scrollWidth > ref.current.clientWidth
      );
  }, [ref, open, setIsTruncatedRef]);

  return (
    <ChevronUpDownIcon className="text-base-400 h-5 w-5" aria-hidden="true" />
  );
});

TriggerButton.propTypes = {
  setIsTruncated: func
};

TriggerButton.defaultProps = {
  setIsTruncated: null
};

export default TriggerButton;
