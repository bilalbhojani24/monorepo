import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { twClassNames } from '@browserstack/utils';
import {
  O11yRefTableBody,
  O11yTable,
  O11yTableCell,
  O11yTableHead,
  O11yTableRow
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

const TableRow = ({ handleRowClick, wrapperClassName, ...restProps }) => {
  const onRowClick = (event) => {
    const { index } = event.currentTarget.dataset;
    if (index) {
      handleRowClick(index);
    }
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <O11yTableRow
      hover
      {...restProps}
      onRowClick={onRowClick}
      wrapperClassName={wrapperClassName}
    />
  );
};

TableRow.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string.isRequired
};

const TableHead = ({ wrapperClassName, ...restProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <O11yTableHead {...restProps} wrapperClassName={wrapperClassName} />
);

TableHead.propTypes = { wrapperClassName: PropTypes.string.isRequired };

const Table = ({
  tableWrapperClassName,
  tableContainerWrapperClassName,
  ...restProps
}) => (
  <O11yTable
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
    containerWrapperClass={twClassNames(
      'border border-base-300',
      tableContainerWrapperClassName
    )}
    tableWrapperClass={tableWrapperClassName}
  />
);

Table.propTypes = {
  tableWrapperClassName: PropTypes.string.isRequired,
  tableContainerWrapperClassName: PropTypes.string.isRequired
};

const LoadingFooter = () => (
  <O11yTableRow>
    <O11yTableCell colspan="100%">
      <O11yLoader />
    </O11yTableCell>
  </O11yTableRow>
);

const VirtualisedTable = ({
  data,
  endReached,
  fixedFooterContent,
  showFixedFooter,
  itemContent,
  overscan,
  style,
  fixedHeaderContent,
  handleRowClick,
  useWindowScroll,
  customScrollParent,
  tableWrapperClassName,
  tableContainerWrapperClassName,
  tableHeaderWrapperClassName,
  tableRowWrapperClassName
}) => {
  const getScrollProps = () => {
    if (customScrollParent) {
      return {
        customScrollParent
      };
    }
    if (useWindowScroll) {
      return {
        useWindowScroll: true
      };
    }
    return {};
  };

  return (
    <TableVirtuoso
      {...getScrollProps()}
      style={{ height: '100%', width: '100%', zIndex: 0, ...style }}
      data={data}
      endReached={endReached}
      overscan={overscan}
      itemContent={itemContent}
      fixedHeaderContent={fixedHeaderContent}
      fixedFooterContent={
        fixedFooterContent ||
        (() => (showFixedFooter ? <LoadingFooter /> : <></>))
      }
      components={{
        Table: (props) => (
          <Table
            {...props}
            tableContainerWrapperClassName={tableContainerWrapperClassName}
            tableWrapperClassName={tableWrapperClassName}
          />
        ),
        TableHead: (props) => (
          <TableHead
            {...props}
            wrapperClassName={tableHeaderWrapperClassName}
          />
        ),
        TableBody: O11yRefTableBody,
        TableRow: (props) => (
          <TableRow
            {...props}
            handleRowClick={handleRowClick}
            wrapperClassName={tableRowWrapperClassName}
          />
        )
      }}
    />
  );
};

VirtualisedTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  endReached: PropTypes.func,
  showFixedFooter: PropTypes.bool.isRequired,
  itemContent: PropTypes.func.isRequired,
  fixedHeaderContent: PropTypes.func.isRequired,
  fixedFooterContent: PropTypes.func,
  overscan: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
  handleRowClick: PropTypes.func,
  useWindowScroll: PropTypes.bool,
  customScrollParent: PropTypes.instanceOf(Element),
  tableWrapperClassName: PropTypes.string,
  tableContainerWrapperClassName: PropTypes.string,
  tableHeaderWrapperClassName: PropTypes.string,
  tableRowWrapperClassName: PropTypes.string
};

VirtualisedTable.defaultProps = {
  endReached: () => {},
  fixedFooterContent: () => {},
  overscan: 20,
  style: {},
  handleRowClick: () => {},
  useWindowScroll: false,
  customScrollParent: null,
  tableWrapperClassName: '',
  tableContainerWrapperClassName: '',
  tableHeaderWrapperClassName: '',
  tableRowWrapperClassName: ''
};

export default VirtualisedTable;
