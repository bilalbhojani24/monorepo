import React, { useState } from 'react';
import {
  Accordion,
  Badge,
  Button,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
// import classnames from 'classnames';
import { twClassNames } from '@browserstack/utils';
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
// import { handleClickByEnterOrSpace } from 'utils/helper';

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
          <div>
            <p className="text-base-700 text-sm">{`Review status (${
              currentItemIndex + 1
            } of ${totalItems}):`}</p>
            &nbsp;
            <Tooltip
              show
              theme="dark"
              content={
                <TooltipBody>
                  {showToolTip
                    ? nodeNeedsReviewStatus[currentItemIndex].reportName
                    : ''}
                </TooltipBody>
              }
            >
              <p>{nodeNeedsReviewStatus[currentItemIndex].reportName}&nbsp;</p>
            </Tooltip>
            <Badge
              text={text}
              modifier={modifier}
              hasDot={false}
              hasRemoveButton={false}
              isRounded={false}
              size="small"
            />
          </div>
        );
      }

      return (
        <div>
          <p>Reports can be reviewed on the extension by the report author</p>
        </div>
      );
    }
    if (isConfirmedInAllReports) {
      return (
        <div>
          <p>Review status:</p>
          {/* <Lozenge
            wrapperClassName="node-issue-navigator__title-review-lozenge"
            text="Confirmed as issue"
            modifier="success"
          /> */}
          <Badge
            text="Confirmed as issue"
            modifier="success"
            hasDot={false}
            hasRemoveButton={false}
            isRounded={false}
            size="small"
          />
          &nbsp;
          <p>
            {showPagination
              ? 'as issue in all source reports'
              : 'in source report'}
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>Review status:</p>
        &nbsp;
        {/* <Lozenge
          wrapperClassName="node-issue-navigator__title-review-lozenge"
          text="Dismissed issue"
          modifier="error"
        /> */}
        &nbsp;
        <p>{showPagination ? 'in all source reports' : 'in source report'}</p>
      </div>
    );
  };

  return (
    <div>
      {getReviewStatusInfo()}
      {showPagination ? (
        <div className="flex">
          {/* <div
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
            <span>Previous</span>
          </div> */}
          <Button
            icon={<MdKeyboardArrowLeft className="text-xl" />}
            iconPlacement="end"
            onClick={handlePreviousClick}
            colors="white"
            disabled={isPreviousDisabled}
            variant="minimal"
            wrapperClassName="mr-3"
          >
            Previous
          </Button>
          <Button
            icon={<MdKeyboardArrowRight className="text-xl" />}
            iconPlacement="end"
            onClick={handleNextClick}
            colors="white"
            disabled={isNextDisabled}
            variant="minimal"
          >
            Next
          </Button>
          {/* <div
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
            <span>Next</span>
            <ChevronRightIcon />
          </div> */}
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

  // const getLeadingIcon = () => {
  //   if (isConfirmedInAllReports === null && !showHiddenIssues)
  //     return <InfoIcon fontSize="small" htmlColor="#917210" />;
  //   if (isConfirmedInAllReports)
  //     return <CheckCircleIcon fontSize="small" htmlColor="#0E8A09" />;
  //   return <CancelIcon fontSize="small" htmlColor="#AE2727" />;
  // };

  return (
    <Accordion
      triggerClassName={twClassNames(
        'flex w-full bg-white py-3 px-6 bg-attention-50',
        {
          'bg-success-50': isConfirmedInAllReports,
          'base-error-50':
            showHiddenIssues ||
            (isConfirmedInAllReports !== null && !isConfirmedInAllReports)
        }
      )}
      triggerContentNode={
        <div className="flex w-full cursor-pointer items-center justify-between">
          <div className="ml-2 flex items-center">
            <p className="text-base-900 mr-2 text-sm">
              {getNeedsReviewBannerText()}
            </p>
            {/* <div>
              <Badge
                hasDot={false}
                hasRemoveButton={false}
                isRounded
                text={totalCount}
              />
            </div> */}
          </div>
        </div>
      }
      panelContentNode={
        <div
          className={twClassNames('px-6 py-2 bg-attention-50', {
            'bg-success-50': isConfirmedInAllReports,
            'base-error-50':
              showHiddenIssues ||
              (isConfirmedInAllReports !== null && !isConfirmedInAllReports)
          })}
        >
          <span>{message || NEEDS_REVIEW_BANNER_TEXT.DEFAULT_MESSAGE}</span>
          <NodeIssueNavigator
            nodeNeedsReviewStatus={nodeNeedsReviewStatus}
            isConfirmedInAllReports={isConfirmedInAllReports}
            showHiddenIssues={showHiddenIssues}
          />
        </div>
      }
      onTriggerClick={() => setShowDetails(!showDetails)}
      onChevronClick={() => setShowDetails(!showDetails)}
    />
  );

  // return (
  //   <div
  // className={classnames('issue-item__banner-alert', {
  //   'issue-item__banner-alert-accepted': isConfirmedInAllReports,
  //   'issue-item__banner-alert-rejected':
  //     showHiddenIssues ||
  //     (isConfirmedInAllReports !== null && !isConfirmedInAllReports)
  // })}
  //   >
  //     <div className="issue-item__alert-content-wrapper">
  //       <div>
  //         <p className="issue-item__review-message">
  //           <div className="issue-item__review-title">
  //             <div className="issue-item__review-title-contents">
  //               {/* {getLeadingIcon()} */}
  //               <span className="issue-item__review-title-text">
  //                 {/* {getNeedsReviewBannerText()} */}
  //               </span>
  //             </div>
  //             <div
  //               className="issue-item__review-title-contents"
  //               tabIndex={0}
  //               role="button"
  //               onClick={() => setShowDetails(!showDetails)}
  //             >
  //               <span className="issue-item__review-title-text">
  //                 {showDetails ? 'Hide Details' : 'View Details'}
  //               </span>
  //               {showDetails ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
  //             </div>
  //           </div>
  //           {showDetails && (
  //             <div className="issue-item__review-message-body">
  //               <span className="issue-item__review-message-body-text">
  //                 {message || NEEDS_REVIEW_BANNER_TEXT.DEFAULT_MESSAGE}
  //               </span>
  //               <NodeIssueNavigator
  //                 nodeNeedsReviewStatus={nodeNeedsReviewStatus}
  //                 isConfirmedInAllReports={isConfirmedInAllReports}
  //                 showHiddenIssues={showHiddenIssues}
  //               />
  //             </div>
  //           )}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
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
