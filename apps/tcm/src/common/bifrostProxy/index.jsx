/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Alerts,
  Badge,
  Banner,
  Button,
  Checkbox,
  ComboBox,
  EmptyState,
  FileUpload,
  InputField,
  InputWButton,
  ListTree,
  ListTreeNode,
  ListTreeNodeContents,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Notifications,
  PageHeadings,
  RadioGroup,
  RichTextEditor,
  SectionHeadings,
  SelectMenu,
  Slideover,
  SlideoverHeader,
  StackedListWSingleColumn,
  Steps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextArea,
  Tooltip,
  TooltipBody,
  TooltipHeader
} from '@browserstack/bifrost';

import TMAttachments from './components/TMAttachments';
import TMDataTable from './components/TMDataTable';
import TMDropdown from './components/TMDropdown';
import TMPagination from './components/TMPagination';

export const TMAlerts = (props) => <Alerts {...props} />;
export const TMPageHeadings = (props) => (
  <PageHeadings
    wrapperClassName="px-4 py-6 border-b border-base-300 bg-transparent"
    {...props}
  />
);
export const TMTabs = (props) => <Tabs {...props} />;
export const TMListTree = (props) => <ListTree {...props} />;
export const TMListTreeNode = (props) => <ListTreeNode {...props} />;
export const TMListTreeNodeContents = (props) => (
  <ListTreeNodeContents {...props} />
);
export const TMButton = (props) => <Button {...props} />;
export const TMInputField = (props) => <InputField {...props} />;
export const TMInputWButton = (props) => <InputWButton {...props} />;
export const TMComboBox = (props) => <ComboBox {...props} />;
export const TMSectionHeadings = (props) => <SectionHeadings {...props} />;
export const TMSlideoverHeader = (props) => <SlideoverHeader {...props} />;
export const TMEmptyState = (props) => <EmptyState {...props} />;
export const TMNotifications = (props) => <Notifications {...props} />;
export const TMSelectMenu = (props) => <SelectMenu {...props} />;
export const TMSlideover = (props) => <Slideover {...props} />;
export const TMTextArea = (props) => <TextArea {...props} />;
export const TMModal = (props) => <Modal {...props} />;
export const TMModalBody = (props) => <ModalBody {...props} />;
export const TMModalFooter = (props) => <ModalFooter {...props} />;
export const TMModalHeader = (props) => <ModalHeader {...props} />;

export const TMTable = (props) => <Table {...props} />;
export const TMTableBody = (props) => <TableBody {...props} />;
export const TMTableCell = (props) => <TableCell {...props} />;
export const TMTableHead = (props) => <TableHead {...props} />;
export const TMTableRow = (props) => <TableRow {...props} />;

export const TMBadge = (props) => <Badge {...props} />;
export const TMFileUpload = (props) => <FileUpload {...props} />;
export const TMTooltip = (props) => <Tooltip {...props} />;
export const TMTooltipBody = (props) => <TooltipBody {...props} />;
export const TMTooltipHeader = (props) => <TooltipHeader {...props} />;
export const TMStackedListWSingleColumn = (props) => (
  <StackedListWSingleColumn {...props} />
);
export const TMSteps = (props) => <Steps {...props} />;
export const TMRadioGroup = (props) => <RadioGroup {...props} />;
export const TMCheckBox = (props) => <Checkbox {...props} />;
export const TMBanner = (props) => <Banner {...props} />;
export const TMRichTextEditor = (props) => <RichTextEditor {...props} />;

export { TMAttachments, TMDataTable, TMDropdown, TMPagination };
