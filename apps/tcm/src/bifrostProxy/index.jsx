/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Badge,
  Button,
  DataTable,
  Drawer,
  Dropdown,
  EmptyState,
  InputField,
  InputWButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Notifications,
  PageHeadings,
  SectionHeadings,
  SelectMenu,
  StackedListWSingleColumn,
  Tabs,
  TextArea,
} from '@browserstack/bifrost';

export const TMPageHeadings = (props) => <PageHeadings {...props} />;
export const TMTabs = (props) => <Tabs {...props} />;
export const TMButton = (props) => <Button {...props} />;
export const TMInputField = (props) => <InputField {...props} />;
export const TMInputWButton = (props) => <InputWButton {...props} />;
export const TMModal = (props) => <Modal {...props} />;
export const TMDataTable = (props) => <DataTable {...props} />;
export const TMDropdown = (props) => <Dropdown {...props} />;
export const TMSectionHeadings = (props) => <SectionHeadings {...props} />;
export const TMEmptyState = (props) => <EmptyState {...props} />;
export const TMNotifications = (props) => <Notifications {...props} />;
export const TMSelectMenu = (props) => <SelectMenu {...props} />;
export const TMDrawer = (props) => <Drawer {...props} />;
export const TMTextArea = (props) => <TextArea {...props} />;
export const TMModalBody = (props) => <ModalBody {...props} />;
export const TMModalFooter = (props) => <ModalFooter {...props} />;
export const TMModalHeader = (props) => <ModalHeader {...props} />;
export const TMBadge = (props) => <Badge {...props} />;
export const TMStackedListWSingleColumn = (props) => (
  <StackedListWSingleColumn {...props} />
);
