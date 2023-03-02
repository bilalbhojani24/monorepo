/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import {
  Badge,
  Hyperlink,
  InputField,
  StackedListWAvatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

import O11yHeader from './components/O11yHeader';

export const O11yBadge = (props) => <Badge {...props} />;
export const O11yStackedListWAvatar = (props) => (
  <StackedListWAvatar {...props} />
);
export const O11yTable = (props) => <Table {...props} />;
export const O11yRefTableBody = React.forwardRef((props, ref) => (
  <TableBody {...props} ref={ref} />
));
export const O11yTableBody = (props) => <TableBody {...props} />;
export const O11yTableCell = (props) => <TableCell {...props} />;
export const O11yTableHead = (props) => <TableHead {...props} />;
export const O11yTableRow = (props) => <TableRow {...props} />;
export const O11yHyperlink = (props) => <Hyperlink {...props} />;

export const O11yInputField = forwardRef((props, ref) => (
  <InputField {...props} ref={ref} />
));

export { O11yHeader };
