import React from 'react';
import {
  Button,
  DataTable,
  Dropdown,
  EmptyState,
  InputField,
  Modal,
  Notifications,
  PageHeadings,
  SectionHeadings,
  SelectMenu,
  Tabs,
} from '@browserstack/bifrost';

export const TMPageHeadings = (props) => <PageHeadings {...props} />;
export const TMTabs = (props) => <Tabs {...props} />;
export const TMButton = (props) => <Button {...props} />;
export const TMInputField = (props) => <InputField {...props} />;
export const TMModal = (props) => <Modal {...props} />;
export const TMDataTable = (props) => <DataTable {...props} />;
export const TMDropdown = (props) => <Dropdown {...props} />;
export const TMSectionHeadings = (props) => <SectionHeadings {...props} />;
export const TMEmptyState = (props) => <EmptyState {...props} />;
export const TMNotifications = (props) => <Notifications {...props} />;
export const TMSelectMenu = (props) => <SelectMenu {...props} />;
