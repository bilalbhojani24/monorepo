/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Accordion,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  DataVisualization,
  Dropdown,
  InputField,
  SelectMenu,
  SidebarItem,
  SidebarNavigation,
  Stats,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
export const ASAccordion = (props) => <Accordion {...props} />;
export const ASTableBody = (props) => <TableBody {...props} />;
export const ASTableCell = (props) => <TableCell {...props} />;
export const ASTableRow = (props) => <TableRow {...props} />;
export const ASTableHead = (props) => <TableHead {...props} />;
export const ASTable = (props) => <Table {...props} />;
export const ASSelectMenu = (props) => <SelectMenu {...props} />;
export const ASDataVisualization = (props) => <DataVisualization {...props} />;
export const ASStats = (props) => <Stats {...props} />;
