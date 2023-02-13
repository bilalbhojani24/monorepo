import React, { useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  InputField,
  MdClose,
  MdContentCopy,
  MdLink
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton';
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
import {
  ASBadge,
  ASButton,
  ASHyperlink,
  ASTabs,
  ASTooltip,
  ASTooltipBody
} from 'middleware/bifrost';
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

import './customStyle.scss';

// import NeedsReviewBanner from './NeedsReviewBanner';

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

  const sanitizeValue = (val) => {
    if (typeof val !== 'string' && Array.isArray(val)) {
      return val.join(',');
    }
    return val;
  };

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
      activeReportFilters.page.map(({ value }) => value).includes(node.page.url)
    );
  }
  if (activeReportFilters.component.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeReportFilters.component
        .map(({ value }) => value)
        .includes(node.componentId)
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
    <div className="border-base-200 border-l bg-white">
      <div>
        <div className="border-base-200 flex justify-between border-b py-4 pr-4 pl-6">
          <div className="">
            <div className="flex">
              <p
                className="text-base-900 mb-1 mr-2 max-w-md overflow-hidden truncate text-lg font-medium"
                title={title}
              >
                {title}
              </p>
              <ASTooltip
                show={isCopied}
                theme="dark"
                content={
                  <ASTooltipBody>
                    {isCopied ? 'Link copied' : null}
                  </ASTooltipBody>
                }
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
                  <MdLink className="text-xl" />
                </CopyToClipboard>
              </ASTooltip>
            </div>
            {/* <Tooltip
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
            </Tooltip> */}
            {/* <div
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
            </div> */}
            {/* <div
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
            </div> */}
            {/* <div className="issue-item__icon-wrapper issue-item__icon-wrapper--number">
              {activeIssueIndex + 1} of {activeComponentNodes.length}
            </div> */}
            {/* <div
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
            </div> */}
            {/* <div
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
            </div> */}
            {/* <div
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleClickByEnterOrSpace(e, onCloseClick)}
              aria-label="Close Button"
            >
              <CloseIcon onClick={onCloseClick} />
            </div> */}
            <p className="text-base-500">
              Viewing {activeIssueIndex + 1} of {activeComponentNodes.length}{' '}
              issues
            </p>
          </div>
          <MdClose
            className="text-base-400 cursor-pointer text-2xl"
            onClick={onCloseClick}
          />
        </div>
      </div>
      {/* {needsReview && (
        <NeedsReviewBanner
          message={message}
          isConfirmedInAllReports={confirmed}
          showHiddenIssues={showHiddenIssues}
          nodeNeedsReviewStatus={needsReviewStatusinReports}
        />
      )} */}
      <div className="py-4 px-6">
        <div>
          <p className="text-base-900 mb-2 text-base font-medium">
            {headerData.help}
          </p>
          <p className="text-base-500 mb-2 text-sm">
            {headerData.description}
            <ASHyperlink
              href={`https://accessibility.browserstack.com/more-info/4.4/${activeViolation.id}`}
              target="_blank"
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
              wrapperClassName="font-semibold inline-flex ml-1"
            >
              Learn more
            </ASHyperlink>
          </p>
          {tagList.length > 0 && (
            <div>
              {tagList.map(({ label, value }) => (
                <div
                  key={label}
                  tabIndex={0}
                  onClick={value ? () => onTagClick(value) : () => {}}
                  role="button"
                  aria-label={`Go to ${label}.Link will open in a new tab.`}
                  onKeyDown={(e) =>
                    handleClickByEnterOrSpace(e, () => onTagClick(value))
                  }
                >
                  <ASBadge
                    hasDot={false}
                    hasRemoveButton={false}
                    isRounded
                    size="large"
                    text={label.toUpperCase()}
                    modifier="primary"
                  />
                </div>
              ))}
            </div>
          )}
          {reportList.length > 0 && (
            <div className="mt-4 flex text-sm font-medium">
              <p className="text-base-500 text-sm font-medium">
                Source report(s):
              </p>
              <p className="text-base-900 ml-1 flex">{reportList.join(', ')}</p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-base-700 mb-1 text-sm">Affected page: </p>
            <div className="flex">
              <div className="mr-2 w-full">
                <InputField id={url} value={url} readonly />
              </div>
              <CopyButton text={window.location.href} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6">
        <ASTabs
          tabsArray={[
            {
              name: 'Issue details',
              value: ISSUE_DETAILS_TAB
            },
            {
              name: 'How to fix',
              value: HOW_TO_FIX_TAB
            }
          ]}
          onTabChange={({ value }) => onTabChange(value)}
        />
        {activeTab === ISSUE_DETAILS_TAB && (
          <div className="mt-4">
            <div className="mb-4">
              <p className="text-base-700 text-sm font-medium">CSS Selector</p>
              <div className="flex items-start">
                <div className="mr-2 w-full">
                  <SyntaxHighlighter
                    language="css"
                    style={a11yLight}
                    wrapLongLines
                  >
                    {sanitizeValue(target)}
                  </SyntaxHighlighter>
                </div>
                <CopyButton text={sanitizeValue(target)} />
              </div>
            </div>
            <div>
              <p>HTML Snippet</p>
              <div className="flex items-start">
                <div className="mr-2 w-full">
                  <SyntaxHighlighter
                    language="html"
                    style={a11yLight}
                    wrapLongLines
                  >
                    {sanitizeValue(html)}
                  </SyntaxHighlighter>
                </div>
                <CopyButton text={sanitizeValue(html)} />
              </div>
            </div>
          </div>
        )}
        {activeTab === HOW_TO_FIX_TAB && (
          <div>
            <div>
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
                      {index !== 0 && <p>and</p>}
                      <p className="text-base-700 mb-2 text-sm font-medium">
                        Fix {type === 'any' ? 'any' : 'all'} of the following
                      </p>
                      <ul className="text-base-500 mb-4 ml-6 list-disc text-sm">
                        {nodeList.map(({ message: nodeMessage }) => (
                          <li key={nodeMessage}>{nodeMessage}</li>
                        ))}
                      </ul>
                      {hasRelatedNodes && (
                        <div>
                          <p className="text-base-700 mb-1 text-sm font-medium">
                            Related CSS Selector(s)
                          </p>
                          {nodeList.map(({ relatedNodes }) =>
                            relatedNodes.map((item) => {
                              const targetNode = item.target
                                ? item.target.join(' ')
                                : item.html;
                              return (
                                <div className="flex">
                                  <div className="mr-2 w-full">
                                    <SyntaxHighlighter
                                      language="css"
                                      style={a11yLight}
                                      wrapLongLines
                                      customStyle={{ padding: '6px' }}
                                    >
                                      {targetNode}
                                    </SyntaxHighlighter>
                                  </div>
                                  <CopyButton text={sanitizeValue(html)} />
                                </div>
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
