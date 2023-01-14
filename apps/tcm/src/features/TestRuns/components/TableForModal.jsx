import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCases } from 'api/testcases.api';
import { TMDataTable } from 'bifrostProxy';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon,
} from 'Icons';

import { setAddTestRunFormData } from '../slices/testRunsSlice';

const TableForModal = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [testCases, setTestCases] = useState([]);

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpwardOutlinedIcon className="mr-2 text-danger-500" />;
      case 'low':
        return <ArrowDownwardOutlinedIcon className="mr-2 text-success-500" />;
      case 'critical':
        return (
          <KeyboardDoubleArrowUpOutlinedIcon className="mr-2 text-danger-700" />
        );
      case 'medium':
        return <RemoveOutlinedIcon className="mr-2 text-brand-500" />;
      default:
        return '';
    }
  };

  const TEST_CASE_COLUMNS = [
    {
      name: 'ID',
      key: 'id',

      cell: (rowData) => `TC-${rowData?.id}`,
    },
    {
      name: 'TITLE',
      key: 'name',
      cell: (rowData) => rowData.name,
    },
    {
      name: 'PRIORITY',
      key: 'priority',
      cell: (rowData) => (
        <span className="capitalize">
          {formatPriority(rowData.priority)}
          {rowData.priority}
        </span>
      ),
    },
  ];

  const { id: currentFolderId, name: currentFolderName } = useSelector(
    (state) => state.testRuns.currentFolder,
  );

  const handleTableRowSelect = (_, selectedItems) => {
    const idArray = selectedItems.map((item) => item.id);
    dispatch(setAddTestRunFormData({ key1: 'test_case_ids', value: idArray }));
  };

  useEffect(() => {
    if (currentFolderId) {
      getTestCases({ projectId, folderId: currentFolderId }).then((data) => {
        setTestCases(data.testcases);
      });
    }
  }, [projectId, currentFolderId]);

  return (
    <div className="mt-4 grow">
      <div className="rounded-t-md border border-solid border-base-200 p-4">
        {currentFolderName}
      </div>
      <TMDataTable
        isSelectable
        rows={testCases}
        columns={TEST_CASE_COLUMNS}
        onRowSelect={handleTableRowSelect}
      />
    </div>
  );
};

export default TableForModal;
