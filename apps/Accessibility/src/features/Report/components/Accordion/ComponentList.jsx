import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setActiveComponentId,
  setActiveViolationId,
  setIsShowingIssue
} from 'features/Report/slice/appSlice';
import {
  getActiveComponentId,
  getIsShowingIssue
} from 'features/Report/slice/selector';
import PropTypes from 'prop-types';
import {
  formatComponentIdString,
  handleClickByEnterOrSpace,
  updateUrlWithQueryParam
} from 'utils/helper';

export default function ComponentList({ nodes, violationId }) {
  const dispatch = useDispatch();
  const history = useNavigate();
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
    history.push({ search: `?${path}` });
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
      componentId: formatComponentIdString(key),
      pagesAffected: `${uniqUrls.length} page${uniqUrls.length > 1 ? 's' : ''}`,
      issueCount: `${componentMap[key].length} issue${
        componentMap[key].length > 1 ? 's' : ''
      }`,
      count: componentMap[key].length
    };
  });

  tableData = tableData.sort((a, b) => b.count - a.count);

  return (
    <div
    // className={classNames('component-list', {
    //   'component-list--half-view': activeComponentId && isShowingIssue
    // })}
    >
      <div className="component-list__header">
        <p className="component-list__col-first">Component</p>
        <p className="component-list__col-second">Affected pages</p>
        <p className="component-list__col-third">Issue count</p>
      </div>
      {tableData.map(
        ({ id, isActive, componentId, pagesAffected, issueCount }) => (
          <div
            // className={classNames('component-list__row', {
            //   'component-list__row--active': isActive
            // })}
            onClick={() => onRowClick(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              handleClickByEnterOrSpace(
                e,
                () => onRowClick(id),
                'firstPageIcon'
              )
            }
          >
            <p className="component-list__col-first" title={componentId}>
              {componentId}
            </p>
            <p className="component-list__col-second">{pagesAffected}</p>
            <p className="component-list__col-third">{issueCount}</p>
          </div>
        )
      )}
    </div>
  );
}

ComponentList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  violationId: PropTypes.string.isRequired
};
