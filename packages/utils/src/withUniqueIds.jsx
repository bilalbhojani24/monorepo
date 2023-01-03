import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const withUniqueIds = (Component, count = 0, prefix = '') => {
  const NewComponent = (props) => {
    const ids = useMemo(() => Array.from(Array(count), () => `${prefix}__${uuidv4()}`), []);
    return <Component ids={ids} {...props} />;
  };
  NewComponent.displayName = `WrappedWithUniqueIds(${Component.name})`;
  if (IS_DEV) {
    NewComponent.WrappedComponent = Component;
  }
  return NewComponent;
};

export default withUniqueIds;
