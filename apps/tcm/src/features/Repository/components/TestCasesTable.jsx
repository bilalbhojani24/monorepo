/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { twClassNames } from '@browserstack/utils';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon
} from 'assets/icons';
import {
  TMButton,
  TMCheckBox,
  TMDropdown,
  TMPagination,
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableHead,
  TMTableRow,
  TMTruncateText
} from 'common/bifrostProxy';
import ClampedTags from 'common/ClampedTags';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';
import { getSystemOrCustomValue } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/testCaseConst';

import FolderExplorerModal from './FolderExplorerModal';
import useTestCasesTable from './useTestCasesTable';

const TestCasesTable = ({
  rows,
  onPaginationClick,
  containerWrapperClass,
  isCondensed,
  isLoading,
  isSearchFilterView,
  metaPage,
  isMini,
  onItemSelectionCb,
  selectedTestCases
}) => {
  const {
    testCaseId,
    showMoveModal,
    selectedTestCaseIDs,
    deSelectedTestCaseIDs,
    isAllSelected,
    isAllChecked,
    isIndeterminate,
    bulkMoveTestCaseCtaLoading,
    updateSelection,
    selectAll,
    initBulkMove,
    initBulkEdit,
    initBulkDelete,
    hideFolderModal,
    moveTestCasesHandler,
    onDropDownChange,
    handleTestCaseViewClick,
    setShowFreshChatButton,
    dispatch
  } = useTestCasesTable({
    rows,
    onItemSelectionCb,
    selectedTestCases,
    isMini
  });

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

  const datatableColumnsFull = [
    {
      name: 'ID',
      key: 'identifier',
      cell: (rowData) => (
        <div
          role="button"
          className="text-base-900 hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData, 'ID')}
          onKeyDown={handleTestCaseViewClick(rowData, 'ID')}
        >
          <TMTruncateText
            ignoreClickAndWrapText
            truncateUsingClamp={false}
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500
            }}
          >
            {rowData?.identifier}
          </TMTruncateText>
        </div>
      ),
      class: 'w-[4%] max-w-[112px]'
    },
    {
      name: 'TITLE',
      key: 'name',
      cell: (rowData) => (
        <div
          role="button"
          className={twClassNames(
            'text-base-900 hover:text-brand-600 cursor-pointer font-medium',
            {
              'text-brand-600': `${rowData?.id}` === testCaseId
            }
          )}
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData, 'Title')}
          onKeyDown={handleTestCaseViewClick(rowData, 'Title')}
        >
          {isSearchFilterView ? (
            <>
              <div className="text-base-900 hover:text-brand-600 font-medium ">
                <TMTruncateText
                  ignoreClickAndWrapText
                  truncateUsingClamp={false}
                  hidetooltipTriggerIcon
                  isFullWidthTooltip
                  headerTooltipProps={{
                    delay: 500
                  }}
                >
                  {rowData.name}
                </TMTruncateText>
              </div>
              <div className="text-base-400 font-normal">
                <TMTruncateText
                  ignoreClickAndWrapText
                  truncateUsingClamp={false}
                  hidetooltipTriggerIcon
                  isFullWidthTooltip
                  headerTooltipProps={{
                    delay: 500
                  }}
                >
                  {rowData?.folders
                    ?.map((item) => item.name)
                    ?.reverse()
                    ?.join('  >  ')}
                </TMTruncateText>
              </div>
            </>
          ) : (
            <TMTruncateText
              truncateUsingClamp={false}
              hidetooltipTriggerIcon
              isFullWidthTooltip
              ignoreClickAndWrapText
              headerTooltipProps={{
                delay: 500
              }}
            >
              {rowData.name}
            </TMTruncateText>
          )}
        </div>
      ),
      class: 'w-[42%] max-w-xs'
    },
    {
      name: 'PRIORITY',
      key: 'priority',
      cell: (rowData) => (
        <div className="text-base-500">
          <TMTruncateText
            truncateUsingClamp={false}
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500
            }}
          >
            {formatPriority(rowData?.priority?.internal_name?.toLowerCase())}
            {rowData?.priority?.name || '--'}
          </TMTruncateText>
        </div>
      ),
      class: 'w-[15%] max-w-[160px]'
    },
    {
      name: 'OWNER',
      key: 'owner',
      cell: (rowData) => (
        <span className="text-base-500">
          {getSystemOrCustomValue(
            rowData?.assignee?.full_name,
            rowData?.owner_imported
          )}
        </span>
      ),
      class: 'w-[15%]'
    },
    {
      name: 'Tags',
      key: 'tags',
      cell: (rowData) => (
        <ClampedTags tagsArray={rowData.tags} badgeModifier="base" />
      ),
      class: 'w-[10%]'
    },
    {
      name: '',
      key: 'action',
      isSticky: true,
      stickyPosition: 'right',
      cell: (data) => (
        <TMDropdown
          options={dropDownOptions}
          triggerVariant="meatball-button"
          onClick={(selectedOption) =>
            onDropDownChange(selectedOption, data, true)
          }
          optionGroupWrapperClassName="w-40"
        />
      ),
      class: 'w-[1%]'
    }
  ];

  const datatableColumns = isMini
    ? datatableColumnsFull.filter((item, index) => index < 3)
    : datatableColumnsFull;

  useEffect(() => {
    if (!isSearchFilterView) {
      dispatch(setShowFreshChatButton(false));
    }
    return () => {
      dispatch(setShowFreshChatButton(true));
    };

    // adding setShowFreshChatButton to dependency array results in unnecessary calls to the reducer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSearchFilterView]);

  return (
    <>
      <TMTable
        tableWrapperClass="table-fixed"
        containerWrapperClass={twClassNames(
          containerWrapperClass,
          'overflow-y-auto',
          'overflow-x-auto'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            <td
              variant="body"
              className="border-base-50 text-base-500 w-[1%] p-2"
              textTransform="uppercase"
            >
              {/* all checkbox */}
              <TMCheckBox
                border={false}
                wrapperClassName="pt-0 pl-2"
                checked={isAllChecked}
                indeterminate={isIndeterminate}
                onChange={selectAll}
              />
            </td>
            {datatableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key || index}
                variant="body"
                wrapperClassName={twClassNames(`test-base-500`, col?.class, {
                  'first:pr-3 last:pl-3 px-4 py-2': isCondensed,
                  'sticky bg-base-50': col.isSticky,
                  'right-0 ': col.isSticky && col.stickyPosition === 'right',
                  'left-10 ': col.isSticky && col.stickyPosition === 'left'
                })}
                textTransform="uppercase"
              >
                {col.name}
                {index === 0 &&
                (selectedTestCaseIDs.length || isAllSelected) &&
                !isMini ? (
                  <div className="bg-base-50 border-base-300 absolute top-0 flex h-full items-center gap-3 border-b">
                    <TMButton
                      colors="white"
                      size="extra-small"
                      onClick={initBulkMove}
                    >
                      Move
                    </TMButton>
                    {(selectedTestCaseIDs.length > 1 || isAllSelected) && (
                      <>
                        <TMButton
                          colors="white"
                          size="extra-small"
                          onClick={initBulkEdit}
                        >
                          Bulk Edit
                        </TMButton>
                        <TMButton
                          colors="white"
                          size="extra-small"
                          onClick={initBulkDelete}
                        >
                          Bulk Delete
                        </TMButton>
                      </>
                    )}
                  </div>
                ) : (
                  ''
                )}
              </TMTableCell>
            ))}
          </TMTableRow>
        </TMTableHead>
        <TMTableBody wrapperClassName="border-b-0">
          {!isLoading ? (
            <>
              {rows?.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TMTableRow isSelected key={row.id || index}>
                  <td
                    variant="body"
                    className={twClassNames(
                      'border-base-50 test-base-500 p-2',
                      !deSelectedTestCaseIDs.includes(row.id) &&
                        (isAllSelected || selectedTestCaseIDs.includes(row.id))
                        ? 'border-l-brand-600'
                        : 'border-l-white'
                    )}
                    textTransform="uppercase"
                  >
                    <TMCheckBox
                      border={false}
                      wrapperClassName="pt-0 pl-2"
                      checked={
                        !deSelectedTestCaseIDs.includes(row.id) &&
                        (isAllSelected || selectedTestCaseIDs.includes(row.id))
                      }
                      onChange={(e) => updateSelection(e, row)}
                    />
                  </td>
                  {datatableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TMTableCell
                        key={column.key}
                        wrapperClassName={twClassNames(column?.class, {
                          'first:pr-3 last:pl-3 px-4 py-2': isCondensed,
                          'sticky bg-white': column.isSticky,
                          'right-0 ':
                            column.isSticky &&
                            column.stickyPosition === 'right',
                          'left-10 ':
                            column.isSticky && column.stickyPosition === 'left'
                        })}
                      >
                        {column.cell ? <>{column.cell(row)}</> : value}
                      </TMTableCell>
                    );
                  })}
                </TMTableRow>
              ))}
            </>
          ) : null}
        </TMTableBody>
      </TMTable>
      {isLoading ? (
        <div className="flex w-full flex-col justify-center">
          <Loader wrapperClassName="h-96 w-full" />
        </div>
      ) : null}
      {metaPage?.count > metaPage?.page_size && (
        <TMPagination
          amplitudeEvent="TM_TcSearchPageLoaded"
          pageNumber={metaPage?.page || 1}
          count={metaPage?.count || 0}
          pageSize={metaPage?.page_size}
          onActionClick={onPaginationClick}
        />
      )}
      <FolderExplorerModal
        show={showMoveModal}
        heading="Move Test Cases"
        subHeading="Choose desired folder where you want to move the test cases:"
        alertText="The selected test cases will be moved from the current location to the above selected folder."
        onOK={moveTestCasesHandler}
        onClose={hideFolderModal}
        loading={bulkMoveTestCaseCtaLoading}
      />
    </>
  );
};

TestCasesTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  containerWrapperClass: PropTypes.string,
  isCondensed: PropTypes.bool,
  onPaginationClick: PropTypes.func,
  onItemSelectionCb: PropTypes.func,
  isLoading: PropTypes.bool,
  isMini: PropTypes.bool,
  isSearchFilterView: PropTypes.bool,
  metaPage: PropTypes.objectOf({
    page: PropTypes.number,
    next: PropTypes.number,
    prev: PropTypes.number,
    count: PropTypes.number
  }),
  selectedTestCases: PropTypes.arrayOf(PropTypes.number)
};

TestCasesTable.defaultProps = {
  containerWrapperClass: '',
  isCondensed: false,
  isSearchFilterView: false,
  isMini: false,
  isLoading: false,
  onPaginationClick: null,
  onItemSelectionCb: () => {},
  metaPage: {
    page: null,
    next: null,
    prev: null,
    count: null
  },
  selectedTestCases: null // only if this is passed as prop take it, else ignore
};

export default TestCasesTable;
