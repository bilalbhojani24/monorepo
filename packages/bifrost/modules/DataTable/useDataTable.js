import { useEffect, useRef, useState } from 'react';

const useDataTable = ({ rows, onSort, onRowSelect, onAllRowSelect }) => {
  const tableRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [sort, setSort] = useState({});

  const handleRowChange = (e, row) => {
    const updatedRows = e.target.checked ? [...selectedRow, row] : selectedRow.filter((r) => r !== row);
    setSelectedRow(updatedRows);
    if (onRowSelect) onRowSelect(row, updatedRows);
  };

  const handleToggleAll = () => {
    const updatedRows = tableData.length === selectedRow.length ? [] : rows;
    setSelectedRow(updatedRows);
    if (onAllRowSelect) onAllRowSelect(updatedRows);
  };

  const handleSort = (key, sortType) => {
    setSort((prevState) => ({
      ...prevState,
      [key]: {
        key: key,
        type: sortType
      }
    }));
    if (onSort) onSort(key, sortType);
  };

  useEffect(() => {
    setTableData(rows);
  }, [rows]);

  return { tableData, tableRef, selectedRow, handleRowChange, handleToggleAll, handleSort, sort };
};

export default useDataTable;
