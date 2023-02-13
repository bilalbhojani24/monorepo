/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { issueTypes } from 'constants';
// import { logEvent } from '@browserstack/utils';
import format from 'date-fns/format';
import { ASBadge, ASCheckbox } from 'middleware/bifrost';
import PropTypes from 'prop-types';
import {
  handleClickByEnterOrSpace,
  updateUrlWithQueryParam
} from 'utils/helper';

import { setIsReportSelected } from '../../slices/reportsAppSlice';
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
    if (e.target.id === 'checkbox') {
      return;
    }
    if (isSelectionMode) {
      dispatch(setIsReportSelected({ id, isSelected: !isSelected }));
    } else {
      // logEvent('InteractedWithADHomepage', {
      //   actionType: 'View individual report'
      // });
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
      // history.push(`reports/report?${path}`);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => handleClickByEnterOrSpace(e, onReportClick)}
      className="border-base-200 flex justify-between border-b bg-white"
      onClick={onReportClick}
    >
      <div className="flex" style={{ width: `calc(100% - 801px)` }}>
        <ASCheckbox
          // ariaLabelText={`${name} selection checkbox`}
          id={id.toString()}
          title={name}
          onChange={onReportCheckBoxClick}
          checked={isSelected}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          wrapperClassName="border-0 flex items-center w-16 justify-center"
          // onClick={(e) => e.stopPropagation()}
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
            <div>{format(new Date(time), 'MMM dd, yyyy, hh:mm aaa')}</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="flex flex-col items-start justify-center"
          style={{ minWidth: '140px' }}
        >
          <ASBadge
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
              <ASBadge
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
