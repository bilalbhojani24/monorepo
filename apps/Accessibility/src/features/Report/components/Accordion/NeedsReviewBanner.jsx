import React, { useState } from 'react';
// import classnames from 'classnames';
import { NEEDS_REVIEW_BANNER_TEXT } from 'constants';
import PropTypes from 'prop-types';
// import Lozenge from 'trike/Lozenge';
// import Tooltip from 'trike/Tooltip';
// import {
//   ArrowDropDownIcon,
//   ArrowDropUpIcon,
//   CancelIcon,
//   CheckCircleIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   InfoIcon
// } from 'app/_modules/Icons';
import { handleClickByEnterOrSpace } from 'utils/helper';

function NodeIssueNavigator({
  nodeNeedsReviewStatus,
  isConfirmedInAllReports,
  showHiddenIssues
}) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const totalItems = nodeNeedsReviewStatus.length;

  const showPagination = nodeNeedsReviewStatus.length > 1;
  const isNextDisabled = currentItemIndex !== totalItems - 1;
  const isPreviousDisabled = currentItemIndex !== 0;

  const handlePreviousClick = () => {
    if (isPreviousDisabled) setCurrentItemIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (isNextDisabled) setCurrentItemIndex((prev) => prev + 1);
  };

  const getReviewTagColor = (confirmed) => {
    if (confirmed) return 'success';
    if (confirmed == null) return 'base';
    return 'error';
  };

  const getTagText = (confirmed) => {
    if (confirmed) return 'Confirmed as issue';
    if (confirmed == null) return 'Needs Review';
    return 'Issue Hidden';
  };

  const getReviewStatusInfo = () => {
    if (isConfirmedInAllReports === null && !showHiddenIssues) {
      if (showPagination) {
        const modifier = getReviewTagColor(
          nodeNeedsReviewStatus[currentItemIndex].confirmed
        );
        const text = getTagText(
          nodeNeedsReviewStatus[currentItemIndex].confirmed
        );
        const showToolTip =
          nodeNeedsReviewStatus[currentItemIndex].reportName.length > 20;

        return (
          <div className="node-issue-navigator__title">
            <p className="node-issue-navigator__title-review-text">{`Review status (${
              currentItemIndex + 1
            } of ${totalItems}):`}</p>
            &nbsp;
            <Tooltip
              description={
                showToolTip
                  ? nodeNeedsReviewStatus[currentItemIndex].reportName
                  : ''
              }
              align="right"
              direction="bottom"
              secondaryAlign="right"
              secondaryDirection="top"
            >
              <p className="node-issue-navigator__title-report-name">
                {nodeNeedsReviewStatus[currentItemIndex].reportName}&nbsp;
              </p>
            </Tooltip>
            <Lozenge
              wrapperClassName="node-issue-navigator__title-review-lozenge"
              text={text}
              modifier={modifier}
              type="subtle"
            />
          </div>
        );
      }

      return (
        <div className="node-issue-navigator__title">
          <p className="node-issue-navigator__title-review-text">
            Reports can be reviewed on the extension by the report author
          </p>
        </div>
      );
    }
    if (isConfirmedInAllReports) {
      return (
        <div className="node-issue-navigator__title">
          <p className="node-issue-navigator__title-review-text">
            Review status:
          </p>
          <Lozenge
            wrapperClassName="node-issue-navigator__title-review-lozenge"
            text="Confirmed as issue"
            modifier="success"
          />
          &nbsp;
          <p className="node-issue-navigator__title-report-name">
            {showPagination
              ? 'as issue in all source reports'
              : 'in source report'}
          </p>
        </div>
      );
    }
    return (
      <div className="node-issue-navigator__title">
        <p className="node-issue-navigator__title-review-text">
          Review status:
        </p>
        &nbsp;
        <Lozenge
          wrapperClassName="node-issue-navigator__title-review-lozenge"
          text="Dismissed issue"
          modifier="error"
        />
        &nbsp;
        <p className="node-issue-navigator__title-report-name">
          {showPagination ? 'in all source reports' : 'in source report'}
        </p>
      </div>
    );
  };

  return (
    <div className="node-issue-navigator">
      {getReviewStatusInfo()}
      {showPagination ? (
        <div className="node-issue-navigator__pagination">
          <div
            className={classnames('node-issue-navigator__pagination-icon', {
              'node-issue-navigator__pagination-icon--disabled':
                isPreviousDisabled
            })}
            tabIndex={0}
            role="button"
            onClick={handlePreviousClick}
            onKeyDown={(e) =>
              handleClickByEnterOrSpace(e, () => handlePreviousClick())
            }
            aria-label="Go to previous issue status"
            aria-disabled={isPreviousDisabled}
          >
            <ChevronLeftIcon />
            &nbsp;
            <span className="node-issue-navigator__pagination-previous-text">
              Previous
            </span>
          </div>
          &nbsp;
          <div
            className={classnames('node-issue-navigator__pagination-icon', {
              'node-issue-navigator__pagination-icon--disabled': isNextDisabled
            })}
            tabIndex={0}
            role="button"
            aria-disabled={isNextDisabled}
            onClick={handleNextClick}
            onKeyDown={(e) =>
              handleClickByEnterOrSpace(e, () => handleNextClick())
            }
            aria-label="Go to next review status"
          >
            <span className="node-issue-navigator__pagination-next-text">
              Next
            </span>
            <ChevronRightIcon />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NeedsReviewBanner({
  isConfirmedInAllReports,
  nodeNeedsReviewStatus,
  message,
  showHiddenIssues
}) {
  const [showDetails, setShowDetails] = useState(false);

  const getNeedsReviewBannerText = () => {
    if (isConfirmedInAllReports === null && !showHiddenIssues)
      return NEEDS_REVIEW_BANNER_TEXT.DEFAULT_TITLE;
    if (isConfirmedInAllReports) return NEEDS_REVIEW_BANNER_TEXT.ACCEPTED;
    return NEEDS_REVIEW_BANNER_TEXT.REJECTED;
  };

  const getLeadingIcon = () => {
    if (isConfirmedInAllReports === null && !showHiddenIssues)
      return <InfoIcon fontSize="small" htmlColor="#917210" />;
    if (isConfirmedInAllReports)
      return <CheckCircleIcon fontSize="small" htmlColor="#0E8A09" />;
    return <CancelIcon fontSize="small" htmlColor="#AE2727" />;
  };

  return (
    <div
      className={classnames('issue-item__banner-alert', {
        'issue-item__banner-alert-accepted': isConfirmedInAllReports,
        'issue-item__banner-alert-rejected':
          showHiddenIssues ||
          (isConfirmedInAllReports !== null && !isConfirmedInAllReports)
      })}
    >
      <div className="issue-item__alert-content-wrapper">
        <div>
          <p className="issue-item__review-message">
            <div className="issue-item__review-title">
              <div className="issue-item__review-title-contents">
                {getLeadingIcon()}
                <span className="issue-item__review-title-text">
                  {getNeedsReviewBannerText()}
                </span>
              </div>
              <div
                className="issue-item__review-title-contents"
                tabIndex={0}
                role="button"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="issue-item__review-title-text">
                  {showDetails ? 'Hide Details' : 'View Details'}
                </span>
                {showDetails ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>
            </div>
            {showDetails && (
              <div className="issue-item__review-message-body">
                <span className="issue-item__review-message-body-text">
                  {message || NEEDS_REVIEW_BANNER_TEXT.DEFAULT_MESSAGE}
                </span>
                <NodeIssueNavigator
                  nodeNeedsReviewStatus={nodeNeedsReviewStatus}
                  isConfirmedInAllReports={isConfirmedInAllReports}
                  showHiddenIssues={showHiddenIssues}
                />
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

NodeIssueNavigator.propTypes = {
  isConfirmedInAllReports: PropTypes.bool.isRequired,
  nodeNeedsReviewStatus: PropTypes.objectOf(PropTypes.any).isRequired,
  showHiddenIssues: PropTypes.bool.isRequired
};

NeedsReviewBanner.propTypes = {
  isConfirmedInAllReports: PropTypes.bool.isRequired,
  nodeNeedsReviewStatus: PropTypes.objectOf(PropTypes.any),
  message: PropTypes.string,
  showHiddenIssues: PropTypes.bool.isRequired
};

NeedsReviewBanner.defaultProps = {
  nodeNeedsReviewStatus: [],
  message: ''
};

export default NeedsReviewBanner;
