/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import {
  Badge,
  Button,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EmptyState,
  Hyperlink,
  InputField,
  InputGroupAddOn,
  Pagination,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Slideover,
  SlideoverBody,
  SlideoverFooter,
  SlideoverHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TruncateText
} from '@browserstack/bifrost';

import { BSTACK_TOPNAV_ELEMENT_ID } from '../../constants/common';

export const INTGBadge = (props) => <Badge {...props} />;

export const INTGTable = (props) => <Table {...props} />;
export const INTGButton = forwardRef((props, ref) => (
  <Button {...props} ref={ref} />
));
export const INTGInputGroupAddOn = (props) => <InputGroupAddOn {...props} />;
export const INTGDropdown = (props) => <Dropdown {...props} />;
export const INTGDropdownOptionGroup = (props) => (
  <DropdownOptionGroup {...props} />
);
export const INTGPagination = (props) => <Pagination {...props} />;
export const INTGDropdownTrigger = (props) => <DropdownTrigger {...props} />;
export const INTGDropdownOptionItem = (props) => (
  <DropdownOptionItem {...props} />
);
export const INTGSlideoverFooter = (props) => <SlideoverFooter {...props} />;
// eslint-disable-next-line react/prop-types
export const INTGTableBody = ({ wrapperClassName, ...props }) => (
  <TableBody {...props} wrapperClassName={`border-0 ${wrapperClassName}`} />
);
export const INTGTableCell = (props) => <TableCell {...props} />;
export const INTGTableHead = (props) => <TableHead {...props} />;
export const INTGTableRow = (props) => <TableRow {...props} />;
export const O11yHyperlink = (props) => <Hyperlink {...props} />;

export const INTGSelectMenu = (props) => <SelectMenu {...props} />;
export const INTGSelectMenuLabel = (props) => <SelectMenuLabel {...props} />;
export const INTGSelectMenuOptionGroup = (props) => (
  <SelectMenuOptionGroup {...props} />
);
export const INTGSelectMenuOptionItem = (props) => (
  <SelectMenuOptionItem {...props} />
);
export const INTGSelectMenuTrigger = (props) => (
  <SelectMenuTrigger {...props} />
);
export const INTGTooltip = (props) => <Tooltip {...props} />;
export const INTGInputField = forwardRef((props, ref) => (
  <InputField {...props} ref={ref} />
));

export const INTGSlideover = (props) => (
  <Slideover {...props} topMarginElementId={BSTACK_TOPNAV_ELEMENT_ID} />
);
export const INTGSlideoverHeader = (props) => <SlideoverHeader {...props} />;
export const INTGSlideoverBody = (props) => <SlideoverBody {...props} />;
export const INTGTruncateText = TruncateText;

export const INTGEmptyState = (props) => <EmptyState {...props} />;

export { default as INTGHeader } from './components/INTGHeader';
export { default as INTGLoader } from './components/INTGLoader';
