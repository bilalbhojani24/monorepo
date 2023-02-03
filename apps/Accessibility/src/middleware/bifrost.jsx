/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  InputField,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';

export const ASButton = (props) => <Button {...props} />;
export const ASSidebarNavigation = (props) => <SidebarNavigation {...props} />;
export const ASSidebarItem = (props) => <SidebarItem {...props} />;
export const ASInputField = (props) => <InputField {...props} />;
export const ASDropdown = (props) => <Dropdown {...props} />;
export const ASBadge = (props) => <Badge {...props} />;
export const ASCheckbox = (props) => <Checkbox {...props} />;
