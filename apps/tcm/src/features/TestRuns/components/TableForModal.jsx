import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCasesAPI } from 'api/testcases.api';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  InfoOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon,
} from 'assets/icons';
import { TMDataTable } from 'common/bifrostProxy';

import { setAddTestRunFormData } from '../slices/testRunsSlice';

const TableForModal = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [testCases, setTestCases] = useState([]);

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpwardOutlinedIcon className="text-danger-500 mr-2" />;
      case 'low':
        return <ArrowDownwardOutlinedIcon className="text-success-500 mr-2" />;
      case 'critical':
        return (
          <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-2" />
        );
      case 'medium':
        return <RemoveOutlinedIcon className="text-brand-500 mr-2" />;
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
      getTestCasesAPI({ projectId, folderId: currentFolderId }).then((data) => {
        setTestCases(data.testcases);
      });
    }
  }, [projectId, currentFolderId]);

  return (
    <div className="mt-4 grow">
      <div className="border-base-200 flex items-center rounded-t-md border border-solid p-4">
        {currentFolderName}
        <span className="ml-1">
          <InfoOutlinedIcon fontSize="inherit" />
        </span>
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
