import React, { forwardRef } from 'react';
import { Button } from '@browserstack/bifrost';

export const A11yButton = forwardRef((props, ref) => (
  <Button {...props} ref={ref} />
));
