import React, { forwardRef } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import {
  O11yRefTableBody,
  O11yTable,
  O11yTableCell,
  O11yTableHead,
  O11yTableRow
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

const TableRow = ({ handleRowClick, ...restProps }) => {
  const onRowClick = (event) => {
    const { index } = event.currentTarget.dataset;
    if (index) {
      handleRowClick(index);
    }
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <O11yTableRow hover {...restProps} onRowClick={onRowClick} />;
};

TableRow.propTypes = { handleRowClick: PropTypes.func.isRequired };

const TableHead = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <O11yTableHead {...props} ref={ref} />
));

const Table = (props) => (
  <O11yTable
    containerWrapperClass="border border-base-300"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

const LoadingFooter = () => (
  <O11yTableRow>
    <O11yTableCell colspan="100%">
      <O11yLoader loaderClass="text-base-600 h-6 w-6 self-center p-1" />
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
  customScrollParent
}) => {
  const getStyles = () => {
    if (useWindowScroll) {
      return {
        useWindowScroll: true,
        ...(customScrollParent && { customScrollParent })
      };
    }
    return { style: { height: '100%', width: '100%', ...style } };
  };

  return (
    <TableVirtuoso
      {...getStyles()}
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
        Table,
        TableHead,
        TableBody: O11yRefTableBody,
        TableRow: (props) => (
          <TableRow {...props} handleRowClick={handleRowClick} />
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
  style: PropTypes.shape(PropTypes.object),
  handleRowClick: PropTypes.func,
  useWindowScroll: PropTypes.bool,
  customScrollParent: PropTypes.instanceOf(Element)
};

VirtualisedTable.defaultProps = {
  endReached: () => {},
  fixedFooterContent: undefined,
  overscan: 20,
  style: {},
  handleRowClick: () => {},
  useWindowScroll: false,
  customScrollParent: null
};

export default VirtualisedTable;
