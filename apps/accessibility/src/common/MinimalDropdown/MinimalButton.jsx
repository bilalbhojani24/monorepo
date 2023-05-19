import React, { forwardRef } from 'react';
import { Button } from '@browserstack/bifrost';

export const MinimalButton = forwardRef((props, ref) => (
  <Button {...props} ref={ref} />
));
