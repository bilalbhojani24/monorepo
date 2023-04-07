/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EmptyState,
  Hyperlink,
  InputField,
  MediaPlayerControlPanel,
  Metadata,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PageHeadings,
  Popover,
  PopoverBody,
  PopoverFooter,
  RadioGroup,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Slideover,
  SlideoverBody,
  SlideoverFooter,
  SlideoverHeader,
  StackedList,
  StackedListCommon,
  StackedListGroup,
  StackedListItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  TruncateText
} from '@browserstack/bifrost';
import { BSTACK_TOPNAV_ELEMENT_ID } from 'constants/common';

import O11yComboBox from './components/O11yComboBox';
import O11yHeader from './components/O11yHeader';
import O11ySwitcher from './components/O11ySwitcher';

export const O11yBadge = (props) => <Badge {...props} />;
export const O11yCheckbox = (props) => <Checkbox {...props} />;
export const O11yTable = (props) => <Table {...props} />;
export const O11yRefTableBody = React.forwardRef((props, ref) => (
  <TableBody {...props} ref={ref} />
));
export const O11yButton = (props) => <Button {...props} />;
export const O11ySwitch = (props) => <Switch {...props} />;
export const O11yDropdown = (props) => <Dropdown {...props} />;
export const O11yDropdownOptionGroup = (props) => (
  <DropdownOptionGroup {...props} />
);
export const O11yDropdownTrigger = (props) => <DropdownTrigger {...props} />;
export const O11yDropdownOptionItem = (props) => (
  <DropdownOptionItem {...props} />
);
export const O11ySlideoverFooter = (props) => <SlideoverFooter {...props} />;
export const O11yTableBody = (props) => <TableBody {...props} />;
export const O11yTableCell = (props) => <TableCell {...props} />;
export const O11yTableHead = (props) => <TableHead {...props} />;
export const O11yTableRow = (props) => <TableRow {...props} />;
export const O11yHyperlink = (props) => <Hyperlink {...props} />;
export const O11yEmptyState = (props) => <EmptyState {...props} />;
export const O11yModal = (props) => <Modal {...props} />;
export const O11yModalBody = (props) => <ModalBody {...props} />;
export const O11yMetaData = (props) => <Metadata {...props} />;
export const O11yModalHeader = (props) => <ModalHeader {...props} />;
export const O11yModalFooter = (props) => <ModalFooter {...props} />;
export const O11yPopover = (props) => <Popover {...props} />;
export const O11yPopoverBody = (props) => <PopoverBody {...props} />;
export const O11yPopoverFooter = (props) => <PopoverFooter {...props} />;
export const O11yRadioGroup = (props) => <RadioGroup {...props} />;
export const O11ySelectMenu = (props) => <SelectMenu {...props} />;
export const O11ySelectMenuLabel = (props) => <SelectMenuLabel {...props} />;
export const O11ySelectMenuOptionGroup = (props) => (
  <SelectMenuOptionGroup {...props} />
);
export const O11ySelectMenuOptionItem = (props) => (
  <SelectMenuOptionItem {...props} />
);
export const O11ySelectMenuTrigger = (props) => (
  <SelectMenuTrigger {...props} />
);
export const O11yTooltip = (props) => <Tooltip {...props} />;
export const O11yTabs = (props) => <Tabs {...props} />;
export const O11yInputField = forwardRef((props, ref) => (
  <InputField {...props} ref={ref} />
));

export const O11ySlideover = (props) => (
  <Slideover {...props} topMarginElementId={BSTACK_TOPNAV_ELEMENT_ID} />
);
export const O11ySlideoverHeader = (props) => <SlideoverHeader {...props} />;
export const O11ySlideoverBody = (props) => <SlideoverBody {...props} />;
export const O11yTruncateText = TruncateText;
export const O11yAccordian = (props) => <Accordion {...props} />;
export const O11yPageHeadings = (props) => <PageHeadings {...props} />;
export const O11yStackedList = (props) => <StackedList {...props} />;
export const O11yStackedListGroup = (props) => <StackedListGroup {...props} />;
export const O11yStackedListItem = (props) => <StackedListItem {...props} />;
export const O11yStackedListCommon = (props) => (
  <StackedListCommon {...props} />
);

export const O11yMediaPlayerControlPanel = (props) => (
  <MediaPlayerControlPanel {...props} />
);

export { O11yComboBox, O11yHeader, O11ySwitcher };
