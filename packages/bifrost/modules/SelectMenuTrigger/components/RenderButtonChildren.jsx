import React, { useContext, useEffect } from 'react';

import { bool, string } from '../../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../../shared/selectMenuContext';
import { renderMultiOptions, renderSingleOptions } from '../helper';

const RenderButtonChildren = (props) => {
  const { setShowCount, isMulti } = useContext(SelectMenuContextData);
  const { value, truncated, placeholder } = props;

  useEffect(() => {
    setShowCount(truncated);
  }, [truncated, setShowCount]);

  return (
    <>
      {isMulti && Array.isArray(value)
        ? renderMultiOptions(value, placeholder)
        : renderSingleOptions(value, placeholder)}
    </>
  );
};

RenderButtonChildren.propTypes = {
  value: string.isRequired,
  placeholder: string.isRequired,
  truncated: bool.isRequired
};

export default RenderButtonChildren;
