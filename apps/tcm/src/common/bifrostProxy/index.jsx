/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  Checkbox,
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
  RadioGroup,
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
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export const TMAlerts = (props) => <Alerts {...props} />;
export const TMPageHeadings = (props) => (
  <PageHeadings
    wrapperClassName="px-4 py-6 border-b border-base-300 bg-transparent"
    {...props}
  />
);
export const TMTabs = (props) => <Tabs {...props} />;
export const TMButton = (props) => <Button {...props} />;
export const TMInputField = (props) => <InputField {...props} />;
export const TMInputWButton = (props) => <InputWButton {...props} />;
export const TMDropdown = (props) => <Dropdown {...props} />;
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
export const TMBadge = (props) => <Badge {...props} />;
export const TMTooltip = (props) => <Tooltip {...props} />;
export const TMStackedListWSingleColumn = (props) => (
  <StackedListWSingleColumn {...props} />
);
export const TMSteps = (props) => <Steps {...props} />;
export const TMRadioGroup = (props) => <RadioGroup {...props} />;
export const TMCheckBox = (props) => <Checkbox {...props} />;

export const TMDataTable = ({ columns, rows, containerWrapperClass }) => (
  <Table containerWrapperClass={containerWrapperClass}>
    <TableHead wrapperClass="w-full rounded-xs">
      <TableRow>
        {columns?.map((col) => (
          <TableCell
            key={col.key}
            variant="body"
            wrapperClass="test-base-500"
            textTransform="uppercase"
          >
            {col.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows?.map((row, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={idx}>
          {columns?.map((column) => {
            const value = row[column.key];
            return (
              <TableCell key={column.id}>
                {column.cell ? <>{column.cell(row)}</> : value}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

TMDataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  containerWrapperClass: PropTypes.string,
};

TMDataTable.defaultProps = {
  containerWrapperClass: '',
};
