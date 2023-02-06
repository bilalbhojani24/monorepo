import React, { useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { GUIDELINES, HOW_TO_FIX_TAB, ISSUE_DETAILS_TAB } from 'constants';
import { SectionsDataContext } from 'features/Report/context/SectionsDataContext';
import {
  getActiveComponentId,
  getActiveComponentNodes,
  getActiveIssueIndex,
  getActiveSwitch,
  getActiveViolation,
  getActiveViolationId,
  getIssueItem,
  getReportFilters,
  getReportMetaData,
  getShowHiddenIssuesState
} from 'features/Report/slice/selector';
// import { Button } from 'trike/Button';
// import Hyperlink from 'trike/Hyperlink';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloseIcon,
//   FirstPageIcon,
//   LastPageIcon,
//   LinkIcon
// } from 'trike/Icons';
// import Tabs from 'trike/Tabs';
// import Tooltip from 'trike/Tooltip';
import {
  handleClickByEnterOrSpace,
  handleFocusElement,
  tagToView
} from 'utils/helper';

// import CopyCode from '../../../CopyCode';
import useIssueItem from '../../useIssueItem';

import NeedsReviewBanner from './NeedsReviewBanner';

export default function IssueItem() {
  const { sectionData } = useContext(SectionsDataContext);
  let activeIssueItem = null;
  let activeViolationItem = null;
  let activeSectionNodes = null;
  const reportMetaData = useSelector(getReportMetaData);
  const issueNode = useSelector(getIssueItem);
  const activeSwitch = useSelector(getActiveSwitch);
  const activeNodes = useSelector(getActiveComponentNodes);
  const activeViolationId = useSelector(getActiveViolationId);
  const activeIssueSection = useSelector(getActiveViolation);
  const activeIssueIndex = useSelector(getActiveIssueIndex);
  const activeComponentId = useSelector(getActiveComponentId);
  const activeReportFilters = useSelector(getReportFilters);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);

  const isGuidelineMode = activeSwitch === GUIDELINES;
  if (isGuidelineMode) {
    activeViolationItem = sectionData.find(
      ({ violation }) => violation.id === activeViolationId
    ).violation;
    if (showHiddenIssues) {
      activeViolationItem = {
        ...activeViolationItem,
        nodes: activeViolationItem.nodes.filter(({ hidden }) => hidden)
      };
    } else {
      activeViolationItem = {
        ...activeViolationItem,
        nodes: activeViolationItem.nodes.filter(({ confirmed }) =>
          activeReportFilters.showNeedsReviewIssues
            ? confirmed === null
            : confirmed || confirmed === null
        )
      };
    }
    activeIssueItem = activeViolationItem.nodes.filter(
      ({ componentId }) => componentId === activeComponentId
    )[activeIssueIndex];
    activeSectionNodes = activeViolationItem.nodes.filter(
      (node) => node.componentId === activeComponentId
    );
  }

  const issueItem = isGuidelineMode ? activeIssueItem : issueNode;
  const activeViolation = isGuidelineMode
    ? activeViolationItem
    : activeIssueSection;
  let activeComponentNodes = isGuidelineMode ? activeSectionNodes : activeNodes;

  // NOTE: Node filter logic for the right panel
  if (activeReportFilters.page.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeReportFilters.page.includes(node.page.url)
    );
  }
  if (activeReportFilters.component.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeReportFilters.component.includes(node.componentId)
    );
  }

  const headerData = {
    tags: isGuidelineMode
      ? activeViolation.tags.filter((tag) => tag === activeViolation.id)
      : activeViolation.tags,
    help: activeViolation.help,
    description: activeViolation.description
  };

  const {
    activeTab,
    isCopied,
    onTabChange,
    onNextClick,
    onPreviousClick,
    onFirstPageClick,
    onLastPageClick,
    onCloseClick,
    onTagClick,
    setIsCopied,
    getNodeNeedsReviewStatusInReports,
    getReviewMessage
  } = useIssueItem(activeComponentNodes);
  const {
    page: { url },
    html,
    target,
    any,
    all,
    none,
    confirmed,
    childNodes,
    needsReview
  } = issueItem;

  const isPreviousDisabled = activeIssueIndex === 0;
  const isNextDisabled = activeIssueIndex === activeComponentNodes.length - 1;
  const tagList = tagToView(headerData.tags);

  const data = [
    {
      type: 'any',
      nodeList: any
    },
    {
      type: 'all',
      nodeList: all
    },
    {
      type: 'none',
      nodeList: none
    }
  ];
  const needsReviewStatusinReports = getNodeNeedsReviewStatusInReports(
    childNodes,
    reportMetaData
  );
  const reportList = needsReviewStatusinReports.map((item) => item.reportName);
  const message = needsReview ? getReviewMessage(data) : '';

  useEffect(() => {
    handleFocusElement('firstPageIcon');
  }, []);

  const title = `${activeComponentId.split('#')[0].toLowerCase()}${
    activeComponentId.split('#')[1] ? '.' : ''
  }${activeComponentId.split('#')[1]}`;

  return (
    <div className="issue-item">
      <div className="issue-item__fix-header">
        <div className="issue-item__header-container">
          <p className="issue-item__header" title={title}>
            {title}
          </p>
          <div className="issue-item__pagination">
            <Tooltip
              description={isCopied ? 'Link copied' : null}
              type="dark"
              direction="bottom"
              hideTooltipDelay={200}
              className="header__share-link"
            >
              <CopyToClipboard
                onCopy={() => {
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2500);
                }}
                text={window.location.href}
              >
                <Button
                  aria-label="Share Link for issue"
                  icon={<LinkIcon />}
                  modifier="grey"
                  type="subtle"
                  size="small"
                  iconPlacement="right"
                  onClick={() => {}}
                />
              </CopyToClipboard>
            </Tooltip>
            <div
              className="issue-item__icon-wrapper"
              tabIndex={0}
              role="button"
              aria-label="Go to First Page"
              aria-disabled={isPreviousDisabled}
              onKeyDown={(e) => handleClickByEnterOrSpace(e, onFirstPageClick)}
            >
              <FirstPageIcon
                id="firstPageIcon"
                className={classnames('issue-item__icon-button', {
                  'issue-item__icon-button--disabled': isPreviousDisabled
                })}
                onClick={onFirstPageClick}
              />
            </div>
            <div
              className="issue-item__icon-wrapper"
              tabIndex={0}
              role="button"
              aria-disabled={isPreviousDisabled}
              onKeyDown={(e) => handleClickByEnterOrSpace(e, onPreviousClick)}
              aria-label="Go to Previous Page"
            >
              <ChevronLeftIcon
                className={classnames('issue-item__icon-button', {
                  'issue-item__icon-button--disabled': isPreviousDisabled
                })}
                onClick={onPreviousClick}
              />
            </div>
            <div className="issue-item__icon-wrapper issue-item__icon-wrapper--number">
              {activeIssueIndex + 1} of {activeComponentNodes.length}
            </div>
            <div
              className="issue-item__icon-wrapper"
              tabIndex={0}
              role="button"
              aria-label="Go to Next Page"
              aria-disabled={isNextDisabled}
              onKeyDown={(e) => handleClickByEnterOrSpace(e, onNextClick)}
            >
              <ChevronRightIcon
                className={classnames('issue-item__icon-button', {
                  'issue-item__icon-button--disabled': isNextDisabled
                })}
                onClick={onNextClick}
              />
            </div>
            <div
              className="issue-item__icon-wrapper"
              tabIndex={0}
              role="button"
              aria-label="Go to Last Page"
              aria-disabled={isNextDisabled}
              onKeyDown={(e) => handleClickByEnterOrSpace(e, onLastPageClick)}
            >
              <LastPageIcon
                className={classnames('issue-item__icon-button', {
                  'issue-item__icon-button--disabled': isNextDisabled
                })}
                onClick={onLastPageClick}
              />
            </div>
            <div
              className="issue-item__icon-wrapper"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleClickByEnterOrSpace(e, onCloseClick)}
              aria-label="Close Button"
            >
              <CloseIcon onClick={onCloseClick} />
            </div>
          </div>
        </div>
      </div>
      {needsReview && (
        <NeedsReviewBanner
          message={message}
          isConfirmedInAllReports={confirmed}
          showHiddenIssues={showHiddenIssues}
          nodeNeedsReviewStatus={needsReviewStatusinReports}
        />
      )}
      <div className={classnames('issue-item__content-wrapper')}>
        <div className={classnames('issue-item__description')}>
          <p className="issue-item__description-header">{headerData.help}</p>
          <p className="issue-item__description-text">
            {headerData.description}
            <Hyperlink
              href={`https://accessibility.browserstack.com/more-info/4.4/${activeViolation.id}`}
              target="_blank"
              label="Learn more.Link will open in a new tab."
              onKeyDown={(e) =>
                handleClickByEnterOrSpace(
                  e,
                  isGuidelineMode
                    ? () => {
                        e.preventDefault();
                        if (tagList[0].value) {
                          onTagClick(tagList[0].value);
                        }
                      }
                    : () => {}
                )
              }
              modifier="primary"
              linkWeight="regular"
              className="issue-item__description-link"
              onClick={
                isGuidelineMode
                  ? (e) => {
                      e.preventDefault();
                      if (tagList[0].value) {
                        onTagClick(tagList[0].value);
                      }
                    }
                  : () => {}
              }
            >
              Learn more
            </Hyperlink>
          </p>
          {tagList.length > 0 && (
            <div className="issue-item__tags">
              {tagList.map(({ label, value }) => (
                <div
                  className="issue-item__tag"
                  key={label}
                  onClick={value ? () => onTagClick(value) : () => {}}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) =>
                    handleClickByEnterOrSpace(e, () => onTagClick(value))
                  }
                  aria-label={`Go to ${label}.Link will open in a new tab.`}
                >
                  {label.toUpperCase()}
                </div>
              ))}
            </div>
          )}
          {reportList.length > 0 && (
            <div className="issue-item__reports">
              <p className="issue-item__reports-title">Source report(s):</p>
              <p className="issue-item__reports-value">
                {reportList.join(', ')}
              </p>
            </div>
          )}
          <div className="issue-item__content-item">
            <p className="issue-item__content-item-header">Affected page: </p>
            <p className="issue-item__content-url">{url}</p>
          </div>
        </div>
      </div>
      <div className="issue-item__tabs">
        <Tabs
          className="issue-item__tab"
          tabs={[
            {
              label: 'Issue details',
              value: ISSUE_DETAILS_TAB
            },
            {
              label: 'How to fix',
              value: HOW_TO_FIX_TAB
            }
          ]}
          size="small"
          type="tight"
          onTabChange={({ value }) => onTabChange(value)}
        />
        {activeTab === ISSUE_DETAILS_TAB && (
          <div className="issue-item__content">
            <div className="issue-item__content-col">
              <div className="issue-item__content-item-wrapper">
                <p className="issue-item__content-item-header">CSS Selector</p>
              </div>
              <CopyCode
                text={target}
                language="css"
                ariaLabel="Copy CSS Selector"
              />
            </div>
            <div className="issue-item__content-col">
              <div className="issue-item__content-item-wrapper">
                <p className="issue-item__content-item-header">HTML Snippet</p>
              </div>
              <div className="issue-item__code-wrapper">
                <CopyCode
                  text={html}
                  language="html"
                  ariaLabel="Copy html Selector"
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === HOW_TO_FIX_TAB && (
          <div className="issue-item__content">
            <div className="issue-item__content-col">
              {data
                .filter(({ nodeList }) => nodeList.length > 0)
                .map(({ type, nodeList }, index) => {
                  let hasRelatedNodes = false;
                  nodeList.forEach(({ relatedNodes }) => {
                    if (relatedNodes.length && !hasRelatedNodes) {
                      hasRelatedNodes = true;
                    }
                  });
                  return (
                    <div key={type}>
                      {index !== 0 && <p className="issue-item__and">and</p>}
                      <p className="issue-item__fix-item">
                        Fix {type === 'any' ? 'any' : 'all'} of the following
                      </p>
                      <ol className="issue-item__fix">
                        {nodeList.map(({ message: nodeMessage }) => (
                          <li key={nodeMessage}>{nodeMessage}</li>
                        ))}
                      </ol>
                      {hasRelatedNodes && (
                        <div>
                          <div className="issue-item__fix-item-header">
                            <p className="issue-item__fix-item issue-item__fix-item--css-selector">
                              Related CSS Selector(s)
                            </p>
                          </div>
                          {nodeList.map(({ relatedNodes }) =>
                            relatedNodes.map((item) => {
                              const targetNode = item.target
                                ? item.target.join(' ')
                                : item.html;
                              return (
                                <CopyCode
                                  text={targetNode}
                                  language="css"
                                  ariaLabel="Copy Related-CSS Selector"
                                />
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
