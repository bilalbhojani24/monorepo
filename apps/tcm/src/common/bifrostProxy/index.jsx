/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Alerts,
  Attachments,
  Badge,
  Button,
  Checkbox,
  ComboBox,
  Dropdown,
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
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
export const TMDropdown = (props) => <Dropdown {...props} />;
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

export const TMDataTable = ({
  columns,
  rows,
  containerWrapperClass,
  isCondensed,
  isLoading
}) => (
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
      {isLoading ? (
        'Loading..'
      ) : (
        <>
          {rows?.map((row, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={idx}>
              {columns?.map((column) => {
                const value = row[column.key];
                return (
                  <TableCell
                    key={column.id}
                    wrapperClass={classNames({
                      'first:pr-3 last:pl-3 px-2 py-2': isCondensed
                    })}
                  >
                    {column.cell ? <>{column.cell(row)}</> : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </>
      )}
    </TableBody>
  </Table>
);

TMDataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  containerWrapperClass: PropTypes.string,
  isCondensed: PropTypes.bool,
  isLoading: PropTypes.bool
};

TMDataTable.defaultProps = {
  containerWrapperClass: '',
  isCondensed: false,
  isLoading: false
};

export const TMAttachments = ({
  attachments,
  onRemoveClick,
  wrapperClassName
}) => {
  if (!attachments?.length) return '';

  return (
    <Attachments
      attachments={attachments.map((item) => ({
        fileName: item.name,
        actions: (
          <TMButton onClick={() => onRemoveClick(item)} variant="minimal">
            Remove
          </TMButton>
        )
      }))}
      wrapperClassName={wrapperClassName}
    />
  );
};

TMAttachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string
};

TMAttachments.defaultProps = {
  wrapperClassName: ''
};
