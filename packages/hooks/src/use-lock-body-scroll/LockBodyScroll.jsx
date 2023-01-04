import React from 'react';

import useLockBodyScroll from './useLockBodyScroll';

const LockBodyScroll = () => {
  useLockBodyScroll();
  return null;
};

export default React.memo(LockBodyScroll);
