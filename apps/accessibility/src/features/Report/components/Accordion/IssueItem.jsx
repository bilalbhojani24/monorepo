import React, { useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  Badge,
  Button,
  Hyperlink,
  InputField,
  MdClose,
  MdLink,
  Pagination,
  Tabs,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton';
import { GUIDELINES, HOW_TO_FIX_TAB, ISSUE_DETAILS_TAB } from 'constants';
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
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
import { getEnvUrl } from 'utils';
import {
  handleClickByEnterOrSpace,
  handleFocusElement,
  tagToView
} from 'utils/helper';

// import CopyCode from '../../../CopyCode';
import useIssueItem from '../../useIssueItem';

import NeedsReviewBanner from './NeedsReviewBanner';

import './customStyle.scss';

export default function IssueItem() {
  const { sectionData } = useContext(SectionsDataContext);
  let activeIssueItem = null;
  let activeViolationItem = null;
  let activeSectionNodes = null;
  const reportMetaData = useSelector(getReportMetaData);
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);
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
    needsReview,
    testType
  } = issueItem;

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

  console.log({ testType });
  const needsReviewStatusinReports = getNodeNeedsReviewStatusInReports(
    childNodes,
    reportMetaData,
    testType
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
    <div className="relative">
      <div className="border-base-200 sticky top-0 z-10 flex w-full items-start justify-between border-b bg-white py-4 pr-4 pl-6">
        <div>
          <div className="flex">
            <p
              className="text-base-900 mb-1 mr-2 max-w-md overflow-hidden truncate text-lg font-medium"
              title={title}
            >
              {title}
            </p>
            <Tooltip
              show={isCopied}
              theme="dark"
              placementSide="right"
              content={
                <TooltipBody wrapperClassName="mb-0">
                  {isCopied ? 'Link copied' : null}
                </TooltipBody>
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
            </Tooltip>
          </div>
          <p className="text-base-500">
            Viewing {activeIssueIndex + 1} of {activeComponentNodes.length}{' '}
            issues
          </p>
        </div>
        <Button
          icon={<MdClose className="text-base-400 text-2xl" />}
          onClick={onCloseClick}
          colors="white"
          size="large"
          isIconOnlyButton
          variant="minimal"
          wrapperClassName="text-2xl p-0"
        />
      </div>
      <div className="pb-40" style={{ top: '90px' }}>
        {needsReview && (
          <NeedsReviewBanner
            message={message}
            isConfirmedInAllReports={confirmed}
            showHiddenIssues={showHiddenIssues}
            nodeNeedsReviewStatus={needsReviewStatusinReports}
          />
        )}
        <div className="py-4 px-6">
          <div>
            <p className="text-base-900 mb-2 text-base font-medium">
              {headerData.help}
            </p>
            <p className="text-base-500 mb-2 text-sm">
              {headerData.description}
              <Hyperlink
                href={`${getEnvUrl()}/more-info/4.4/${activeViolation.id}`}
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
              </Hyperlink>
            </p>
            {tagList.length > 0 && (
              <div className="flex items-center">
                {tagList.map(({ label, value }) => (
                  <div
                    key={label}
                    tabIndex={0}
                    className="mr-2"
                    onClick={value ? () => onTagClick(value) : () => {}}
                    role="button"
                    aria-label={`Go to ${label}.Link will open in a new tab.`}
                    onKeyDown={(e) =>
                      handleClickByEnterOrSpace(e, () => onTagClick(value))
                    }
                  >
                    <Badge
                      hasDot={false}
                      hasRemoveButton={false}
                      isRounded={false}
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
                <p className="text-base-900 ml-1 flex">
                  {reportList.join(', ')}
                </p>
              </div>
            )}
            <div className="mt-4">
              <p className="text-base-700 mb-1 text-sm">Affected page: </p>
              <div className="flex">
                <div className="mr-2 w-full">
                  <InputField id={url} value={url} readonly />
                </div>
                <CopyButton text={url} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs
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
                <p className="text-base-700 mb-1 text-sm font-medium">
                  CSS Selector
                </p>
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
                <p className="text-base-700 mb-1 text-sm font-medium">
                  HTML Snippet
                </p>
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
                        <p className="text-base-700 mb-2 mt-4 text-sm font-medium">
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
      <div
        className="fixed bottom-0 right-0 bg-white"
        style={{
          width: `${
            isSidebarCollapsed
              ? 'calc((100vw - 20px) / 2)'
              : 'calc((100vw - 256px) / 2)'
          }`
        }}
      >
        <Pagination
          key={`${activeViolationId}_${activeComponentId}`}
          hideDetailsString
          withNumber={false}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          pageNumber={activeIssueIndex + 1}
          pageSize={1}
          count={activeComponentNodes.length}
        />
      </div>
    </div>
  );
}
