/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Alerts,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Checkbox,
  EmptyState,
  FileUpload,
  Hyperlink,
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
  TooltipHeader,
  TruncateText
} from '@browserstack/bifrost';

import TMAttachments from './components/TMAttachments';
import TMComboBox from './components/TMComboBox';
import TMDataTable from './components/TMDataTable';
import TMDropdown from './components/TMDropdown';
import TMHeader from './components/TMHeader';
import TMPagination from './components/TMPagination';
import TMSelectMenu from './components/TMSelectMenu';

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
export const TMSectionHeadings = (props) => <SectionHeadings {...props} />;
export const TMEmptyState = (props) => <EmptyState {...props} />;
export const TMNotifications = (props) => <Notifications {...props} />;
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
export const TMHyperlink = (props) => <Hyperlink {...props} />;
export const TMBreadcrumb = (props) => <Breadcrumb {...props} />;
export const TMTruncateText = (props) => <TruncateText {...props} />;

export const TMSlideover = (props) => {
  const topMarginElementId = 'bstack-header';

  return <Slideover {...props} topMarginElementId={topMarginElementId} />;
};
export const TMSlideoverHeader = (props) => (
  <SlideoverHeader
    {...props}
    subheading={<TruncateText>{props?.subheading}</TruncateText>}
    heading={<TruncateText>{props?.heading}</TruncateText>}
  />
);

export {
  TMAttachments,
  TMComboBox,
  TMDataTable,
  TMDropdown,
  TMHeader,
  TMPagination,
  TMSelectMenu
};
