import React, { useState } from 'react';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  Badge,
  Button,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdWarningAmber,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { NEEDS_REVIEW_BANNER_TEXT } from 'constants';
import PropTypes from 'prop-types';

function NodeIssueNavigator({
  nodeNeedsReviewStatus,
  isConfirmedInAllReports,
  showHiddenIssues
}) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const totalItems = nodeNeedsReviewStatus.length;

  const showPagination = nodeNeedsReviewStatus.length > 1;
  const isNextDisabled = currentItemIndex === totalItems - 1;
  const isPreviousDisabled = currentItemIndex === 0;

  const params = new URLSearchParams(window.location.search);
  const wsrIds = params.get('wsr_ids');

  const handlePreviousClick = () => {
    if (!isPreviousDisabled) setCurrentItemIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (!isNextDisabled) setCurrentItemIndex((prev) => prev + 1);
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
          nodeNeedsReviewStatus[currentItemIndex].reportName.length > 100;

        return (
          <div className="flex items-center">
            <p className="text-base-700 text-sm">{`Review status (${
              currentItemIndex + 1
            } of ${totalItems}):`}</p>
            &nbsp;
            <Tooltip
              show={showToolTip}
              theme="dark"
              content={
                <TooltipBody wrapperClassName="mb-0">
                  {showToolTip
                    ? nodeNeedsReviewStatus[currentItemIndex].reportName
                    : ''}
                </TooltipBody>
              }
            >
              <p className="text-sm font-medium">
                {nodeNeedsReviewStatus[currentItemIndex].reportName}&nbsp;
              </p>
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

      return !wsrIds ? (
        <p className="text-attention-700 ml-5 pl-2 text-sm">
          Reports can be reviewed on the extension by the report author
        </p>
      ) : null;
    }
    if (isConfirmedInAllReports) {
      return (
        <div className="ml-7 flex items-center">
          <p className="text-xs">Review status:</p>&nbsp;
          <Badge
            text="Confirmed as issue"
            modifier="success"
            hasDot={false}
            hasRemoveButton={false}
            isRounded={false}
            size="small"
          />
          &nbsp;
          <p className="text-xs">
            {showPagination
              ? 'as issue in all source reports'
              : 'in source report'}
          </p>
        </div>
      );
    }
    return (
      <div className="ml-7 flex items-center">
        <p className="text-xs">Review status:</p>&nbsp;
        <Badge
          text="Dismissed issue"
          modifier="error"
          hasDot={false}
          hasRemoveButton={false}
          isRounded={false}
        />
        &nbsp;
        <p className="text-xs">
          {showPagination ? 'in all source reports' : 'in source report'}
        </p>
      </div>
    );
  };

  return (
    <div>
      {getReviewStatusInfo()}
      {showPagination ? (
        <div className="flex">
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
  const getNeedsReviewBannerText = () => {
    if (isConfirmedInAllReports === null && !showHiddenIssues)
      return NEEDS_REVIEW_BANNER_TEXT.DEFAULT_TITLE;
    if (isConfirmedInAllReports) return NEEDS_REVIEW_BANNER_TEXT.ACCEPTED;
    return NEEDS_REVIEW_BANNER_TEXT.REJECTED;
  };

  const isFail =
    showHiddenIssues ||
    (isConfirmedInAllReports !== null && !isConfirmedInAllReports);

  return (
    <Accordion>
      <AccordionInteractiveHeader
        wrapperClassName={twClassNames('flex py-2 px-6 bg-attention-50', {
          'bg-success-50': isConfirmedInAllReports,
          'base-error-50': isFail
        })}
        title={
          <p className="text-base-900 mr-2 text-left text-sm">
            {getNeedsReviewBannerText()}
          </p>
        }
      />
      <AccordionPanel>
        <div
          className={twClassNames('px-6 py-2 bg-attention-50', {
            'bg-success-50': isConfirmedInAllReports,
            'base-error-50': isFail
          })}
        >
          <div className="flex items-start">
            <div>
              <MdWarningAmber className="text-attention-500 text-xl" />
            </div>
            <div>
              <p
                className={twClassNames(
                  'text-attention-800 text-sm font-medium mb-2 ml-2',
                  {
                    'text-success-800': isConfirmedInAllReports,
                    'text-error-800': isFail
                  }
                )}
              >
                {message || NEEDS_REVIEW_BANNER_TEXT.DEFAULT_MESSAGE}
              </p>
            </div>
          </div>
          <NodeIssueNavigator
            nodeNeedsReviewStatus={nodeNeedsReviewStatus}
            isConfirmedInAllReports={isConfirmedInAllReports}
            showHiddenIssues={showHiddenIssues}
          />
        </div>
      </AccordionPanel>
    </Accordion>
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
