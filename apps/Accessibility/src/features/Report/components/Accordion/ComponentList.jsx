import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { SectionsDataContext } from 'features/Report/context/SectionsDataContext';
import {
  setActiveComponentId,
  setActiveViolationId,
  setIsShowingIssue
} from 'features/Report/slice/appSlice';
import {
  getActiveComponentId,
  getIsShowingIssue
} from 'features/Report/slice/selector';
import {
  ASTable,
  ASTableBody,
  ASTableCell,
  ASTableHead,
  ASTableRow
} from 'middleware/bifrost';
import PropTypes from 'prop-types';
import {
  formatComponentIdString,
  handleClickByEnterOrSpace,
  updateUrlWithQueryParam
} from 'utils/helper';

export default function ComponentList({ nodes, violationId }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isHalfView } = useContext(SectionsDataContext);
  const activeComponentId = useSelector(getActiveComponentId);
  const isShowingIssue = useSelector(getIsShowingIssue);
  const onRowClick = (key) => {
    dispatch(setActiveViolationId(violationId));
    dispatch(setActiveComponentId(key));
    dispatch(setIsShowingIssue(true));
    const path = updateUrlWithQueryParam({
      activeViolationId: violationId,
      activeComponentId: key,
      isShowingIssue: true,
      activeIssueIndex: 0
    });
    // history.push({ search: `?${path}` });
  };

  const componentMap = {};
  nodes.forEach((node) => {
    if (!componentMap[node.componentId]) {
      componentMap[node.componentId] = [];
    }
    componentMap[node.componentId].push(node);
  });

  let tableData = Object.keys(componentMap).map((key) => {
    const uniqUrls = [];
    componentMap[key].forEach(({ page: { url } }) => {
      if (!uniqUrls.includes(url)) {
        uniqUrls.push(url);
      }
    });
    return {
      id: key,
      isActive: key === activeComponentId,
      componentId: key,
      pagesAffected: `${uniqUrls.length} page${uniqUrls.length > 1 ? 's' : ''}`,
      issueCount: `${componentMap[key].length} issue${
        componentMap[key].length > 1 ? 's' : ''
      }`,
      count: componentMap[key].length
    };
  });

  tableData = tableData.sort((a, b) => b.count - a.count);

  const columns = [
    {
      id: 'componentId',
      name: 'Component',
      key: 'componentId'
    },
    {
      id: 'pagesAffected',
      name: 'Affected pages',
      key: 'pagesAffected'
    },
    {
      id: 'issueCount',
      name: 'Issue count',
      key: 'issueCount'
    }
  ];

  return (
    <div className="bg-white px-6 pt-2 pb-4">
      <ASTable>
        <ASTableHead>
          <ASTableRow>
            {columns.map((col, index) => (
              <ASTableCell
                key={col.key}
                variant="header"
                textTransform="uppercase"
              >
                <div
                  className={`text-base-500 text-xs ${
                    index === 1 ? 'w-28' : ''
                  } ${index === 2 ? 'w-24' : ''}`}
                >
                  {col.name} {index === 0 ? `(${tableData.length})` : ''}
                </div>
              </ASTableCell>
            ))}
          </ASTableRow>
        </ASTableHead>
        <ASTableBody>
          {tableData.map(({ id, isActive, ...rest }) => (
            <ASTableRow
              // className={classNames('component-list__row', {
              //   'component-list__row--active': isActive
              // })}
              wrapperClass="cursor-pointer"
              onRowClick={() => onRowClick(id)}
              // role="button"
              // tabIndex={0}
              // onKeyDown={(e) =>
              //   handleClickByEnterOrSpace(
              //     e,
              //     () => onRowClick(id),
              //     'firstPageIcon'
              //   )
              // }
            >
              {columns.map((column, index) => (
                <ASTableCell
                  key={column.id}
                  wrapperClass={`px-6 py-2 ${index === 1 ? 'w-28' : ''} ${
                    index === 2 ? 'w-24' : ''
                  }`}
                >
                  {index === 0 ? (
                    <p
                      className={twClassNames('overflow-hidden truncate', {
                        'w-56': isHalfView
                      })}
                    >
                      <span className="text-brand-600">
                        {rest[column.key].split('#')[0].toLowerCase()}
                      </span>
                      <span>
                        {rest[column.key].split('#')[1]
                          ? `.${rest[column.key].split('#')[1]}`
                          : ''}
                      </span>
                    </p>
                  ) : (
                    <div>{rest[column.key]}</div>
                  )}
                </ASTableCell>
              ))}
            </ASTableRow>
          ))}
        </ASTableBody>
      </ASTable>
    </div>
  );
}

ComponentList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  violationId: PropTypes.string.isRequired
};
