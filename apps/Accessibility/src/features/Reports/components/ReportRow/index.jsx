/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const history = useNavigate();
  const onReportCheckBoxClick = (isChecked) => {
    dispatch(setIsReportSelected({ id, isSelected: isChecked }));
  };
  const onReportClick = () => {
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
      history.push(`reports/report?${path}`);
    }
  };
  const issueTypes = [
    { modifier: 'error', type: 'critical' },
    { modifier: 'error', type: 'serious' },
    { modifier: 'warn', type: 'moderate' },
    { modifier: 'base', type: 'minor' }
  ];

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => handleClickByEnterOrSpace(e, onReportClick)}
      // className="report-row"
      className="border-base-200 flex border-b bg-white py-4 px-6"
      onClick={onReportClick}
    >
      <div
        // className="report-row__selection"
        className="flex"
        style={{ width: `${(window.innerWidth - 40) / 3}px` }}
      >
        <ASCheckbox
          // ariaLabelText={`${name} selection checkbox`}
          id={id.toString()}
          title={name}
          onChange={onReportCheckBoxClick}
          checked={isSelected}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          wrapperClass="border-0 flex items-center mr-6"
          // onClick={(e) => e.stopPropagation()}
        />
        <div className="flex flex-col items-start justify-center">
          <p className="mb-1 text-sm font-medium" title={name}>
            {name}
          </p>
          <div className="text-base-500 flex text-sm">
            <p className="mr-3">by {userName},</p>
            <div className="report-row__circle-divider" />
            <div>{format(new Date(time), 'MMM dd, yyyy, hh:mm aaa')}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center">
        <ASBadge
          hasDot={false}
          hasRemoveButton={false}
          isRounded={false}
          text="Workflow scan"
        />
        <p className="text-base-500 mt-1 text-sm">{label}</p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <p className="text-base-900 text-sm">{issues} issues</p>
        <p className="text-base-500 text-sm">
          {pageCount} pages, {componentCount} components
        </p>
      </div>
      <div className="flex items-center">
        {issueTypes.map(({ modifier, type }) => (
          <div className="mr-2">
            <ASBadge
              hasDot={false}
              hasRemoveButton={false}
              isRounded={false}
              modifier={modifier}
              text={`${issueSummary[type]} ${type
                .charAt(0)
                .toUpperCase()}${type.slice(1, type.length)}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ReportRow.propTypes = {
  id: PropTypes.string.isRequired
};
