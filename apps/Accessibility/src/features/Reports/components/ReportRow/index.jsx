/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Checkbox } from '@browserstack/bifrost';
import { issueTypes } from 'constants';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import {
  handleClickByEnterOrSpace,
  updateUrlWithQueryParam
} from 'utils/helper';
import { logEvent } from 'utils/logEvent';

import { setIsReportSelected } from '../../slices/appSlice';
import {
  getActiveVersion,
  getIsSelectionMode,
  getReport
} from '../../slices/selector';

export default function ReportRow({ id }) {
  const dispatch = useDispatch();
  const {
    name,
    scanType,
    createdBy: { name: userName },
    componentCount,
    time,
    issues,
    issueSummary,
    isSelected,
    pageCount,
    wcagVersion: { label }
  } = useSelector(getReport(id));
  const activeVersion = useSelector(getActiveVersion);
  const isSelectionMode = useSelector(getIsSelectionMode);
  const navigate = useNavigate();

  const onReportCheckBoxClick = (event) => {
    const isChecked = event.target.checked;
    dispatch(setIsReportSelected({ id, isSelected: isChecked }));
  };

  const onReportClick = (e) => {
    if (e?.target?.id === 'checkbox') {
      return;
    }
    if (isSelectionMode) {
      dispatch(setIsReportSelected({ id, isSelected: !isSelected }));
    } else {
      logEvent('InteractedWithADHomepage', {
        actionType: 'View individual report'
      });
      const params = {
        ids: id,
        wcagVersion: activeVersion.split('WCAG ')[1]
      };
      if (window.dashboardUserID) {
        params.dashboardUserID = window.dashboardUserID;
      }
      const path = updateUrlWithQueryParam({
        ids: id,
        wcagVersion: activeVersion.split('WCAG ')[1]
      });
      navigate(`report?${path}`);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => handleClickByEnterOrSpace(e, () => onReportClick(e))}
      className="border-base-200 hover:bg-base-50 flex justify-between border-b bg-white"
      onClick={onReportClick}
    >
      <div className="flex" style={{ width: `calc(100% - 801px)` }}>
        <Checkbox
          data={{ value: name }}
          border={false}
          wrapperClassName="border-0 flex items-center w-16 justify-center pt-0"
          checked={isSelected}
          onChange={onReportCheckBoxClick}
        />
        <div
          className="flex flex-col items-start justify-center"
          style={{ width: `calc(100% - 64px)` }}
        >
          <p
            className="mb-1 overflow-hidden truncate text-sm font-medium"
            title={name}
            style={{ width: `calc(100% - 64px)` }}
          >
            {name}
          </p>
          <div className="text-base-500 flex text-sm">
            <p className="mr-3">by {userName},</p>
            <p>{format(new Date(time), 'MMM dd, yyyy, hh:mm aaa')}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="flex flex-col items-start justify-center"
          style={{ minWidth: '140px' }}
        >
          <Badge
            hasDot={false}
            hasRemoveButton={false}
            isRounded
            text="Workflow scan"
          />
          <p className="text-base-500 mt-1 ml-2 text-sm">{label}</p>
        </div>
        <div
          className="flex flex-col items-start justify-center px-6 pt-4 pb-5"
          style={{ minWidth: '234px' }}
        >
          <p className="text-base-900 text-sm">{issues} issues</p>
          <p className="text-base-500 overflow-hidden text-ellipsis text-sm">
            {pageCount} pages, {componentCount} components
          </p>
        </div>
        <div
          className="hidden items-center xl:flex"
          style={{ minWidth: '427px' }}
        >
          {issueTypes.map(({ modifier, type }) => (
            <div className="mr-2" key={type}>
              <Badge
                hasDot={false}
                hasRemoveButton={false}
                isRounded
                modifier={modifier}
                text={`${issueSummary[type]} ${type
                  .charAt(0)
                  .toUpperCase()}${type.slice(1, type.length)}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReportRow.propTypes = {
  id: PropTypes.number.isRequired
};
