/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  InputField,
  SidebarItem,
  SidebarNavigation,
  Tabs
} from '@browserstack/bifrost';

export const ASButton = (props) => <Button {...props} />;
export const ASBreadcrumb = (props) => <Breadcrumb {...props} />;
export const ASSidebarNavigation = (props) => <SidebarNavigation {...props} />;
export const ASSidebarItem = (props) => <SidebarItem {...props} />;
export const ASInputField = (props) => <InputField {...props} />;
export const ASDropdown = (props) => <Dropdown {...props} />;
export const ASBadge = (props) => <Badge {...props} />;
export const ASCheckbox = (props) => <Checkbox {...props} />;
export const ASTabs = (props) => <Tabs {...props} />;
