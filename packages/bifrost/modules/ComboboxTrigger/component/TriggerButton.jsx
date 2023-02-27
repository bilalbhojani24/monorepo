import React, { useEffect, useState } from 'react';

import { bool, number } from '../../../shared/proptypesConstants';
import { ChevronUpDownIcon } from '../../Icon';

const TriggerButton = React.forwardRef(({ isMulti, value }, ref) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (ref && ref.current !== null)
      setIsTruncated(ref.current.offsetWidth < ref.current.scrollWidth);
  }, [ref, value]);

  return (
    <>
      {isMulti && value && isTruncated ? (
        <span className="mr-1 font-bold">{`(${value})`}</span>
      ) : null}
      <ChevronUpDownIcon className="text-base-400 h-5 w-5" aria-hidden="true" />
    </>
  );
});

TriggerButton.propTypes = {
  isMulti: bool.isRequired,
  value: number.isRequired
};

export default TriggerButton;
