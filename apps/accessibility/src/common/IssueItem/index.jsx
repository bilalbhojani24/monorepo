import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import ChromeIcon from 'assets/chrome_icon.svg';
import MacIcon from 'assets/mac_icon.svg';
import CopyButton from 'common/CopyButton';
import {
  HOW_TO_FIX_TAB,
  ISSUE_DETAILS_TAB,
  SOURCE_TESTS,
  TEST_TYPE
} from 'constants';
import { getEnvUrl } from 'utils';
import {
  generateReportUrl,
  handleClickByEnterOrSpace,
  handleFocusElement,
  tagToView
} from 'utils/helper';

import NeedsReviewBanner from './NeedsReviewBanner';
import useIssueItem from './useIssueItem';

const tabs = [
  {
    name: 'Issue details',
    value: ISSUE_DETAILS_TAB
  },
  {
    name: 'How to fix',
    value: HOW_TO_FIX_TAB
  },
  {
    name: 'Source tests',
    value: SOURCE_TESTS
  }
];

export default function IssueItem({ sectionsDataContext }) {
  const {
    activeTab,
    isCopied,
    activeIssueIndex,
    activeViolation,
    showHiddenIssues,
    activeComponentNodes,
    activeViolationId,
    isGuidelineMode,
    headerData,
    issueItem,
    buildMetaData,
    activeComponentId,
    tests,
    onSliderOpenClick,
    sanitizeValue,
    onNextClick,
    onPreviousClick,
    onIssueCloseClick,
    onTabChange,
    onTagClick,
    setIsCopied,
    getNodeNeedsReviewStatusInReports,
    getReviewMessage
  } = useIssueItem(sectionsDataContext);
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
    testType,
    failureSummary,
    testCaseIds
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

  const testColumns = [
    {
      id: 'test',
      name: 'Test',
      key: 'test'
    },
    {
      id: 'button',
      name: '',
      key: 'button'
    }
  ];

  const getOSIcon = (name) => {
    const icons = {
      chrome: ChromeIcon,
      mac: MacIcon
    };

    return icons[name];
  };

  console.log('printing tests', tests);

  const needsReviewStatusinReports = getNodeNeedsReviewStatusInReports(
    childNodes,
    testType
  );

  // const reportList = needsReviewStatusinReports.map((item) => item.reportName);
  const message = needsReview ? getReviewMessage(data) : '';

  useEffect(() => {
    handleFocusElement('firstPageIcon');
  }, []);

  const title = `${activeComponentId.split('#')[0].toLowerCase()}${
    activeComponentId.split('#')[1] ? '.' : ''
  }${activeComponentId.split('#')[1]}`;

  const isShowingSourceReport =
    needsReviewStatusinReports.length > 0 &&
    Object.values(buildMetaData?.meta).length > 1;

  return (
    <div className="relative">
      <div className="border-base-200 sticky top-0 z-[15] flex w-full items-start justify-between border-b bg-white py-4 pl-6 pr-4">
        <div>
          <div className="flex items-center">
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
                <Button
                  icon={<MdLink className="cursor-pointer text-xl" />}
                  isIconOnlyButton
                  colors="white"
                  variant="minimal"
                />
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
          onClick={onIssueCloseClick}
          colors="white"
          size="large"
          isIconOnlyButton
          variant="minimal"
          wrapperClassName="text-2xl p-0"
        />
      </div>
      <div className="pb-40">
        {needsReview && (
          <NeedsReviewBanner
            message={message}
            isConfirmedInAllReports={confirmed}
            showHiddenIssues={showHiddenIssues}
            nodeNeedsReviewStatus={needsReviewStatusinReports}
          />
        )}
        <div className="px-6 py-4">
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
                wrapperClassName="font-semibold inline-flex ml-1 font-normal"
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
            {isShowingSourceReport && (
              <div className="mt-4 flex text-sm font-medium">
                <p className="text-base-500 mr-1 flex items-center text-sm font-medium">
                  Source report(s):
                </p>
                {needsReviewStatusinReports.map(({ reportName, id }, index) => (
                  <div className="flex items-center">
                    <Hyperlink
                      href={generateReportUrl(id)}
                      wrapperClassName="font-normal text-sm"
                      target="_blank"
                    >
                      {reportName}
                    </Hyperlink>
                    {index !== needsReviewStatusinReports.length - 1
                      ? ', '
                      : ''}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <p className="text-base-700 mb-1 text-sm">Affected page: </p>
              <div className="flex">
                <InputField
                  id={url}
                  value={url}
                  readonly
                  wrapperClassName="mr-2 w-full"
                />
                <CopyButton text={url} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs
            id="issue-tabs"
            tabsArray={tabs}
            onTabChange={({ value }) => onTabChange(value)}
          />
          {activeTab === ISSUE_DETAILS_TAB && (
            <div className="mt-4">
              <div className="mb-4">
                <p className="text-base-700 mb-1 text-sm font-medium">
                  CSS selector
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
                  HTML snippet
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
              {testType === TEST_TYPE.ASSITIVE_TEST ? (
                <div className="text-base-500 mb-2 mt-4 text-sm font-medium">
                  {failureSummary}
                </div>
              ) : (
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
                            Fix {type === 'any' ? 'any' : 'all'} of the
                            following
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
                                      <CopyButton text={targetNode} />
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
              )}
            </div>
          )}
          {activeTab === SOURCE_TESTS && (
            <div className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    {testColumns.map((col, index) => (
                      <TableCell
                        key={col.key}
                        variant="header"
                        textTransform="uppercase"
                        wrapperClassName={`text-xs text-base-500 ${
                          index === 0 ? 'w-3/4' : ''
                        } ${index === 1 ? 'w-1/4' : ''}`}
                      >
                        {col.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests
                    .filter(({ id }) => testCaseIds.includes(id))
                    .map((test) => (
                      <TableRow>
                        {testColumns.map((column, colIndex) => (
                          <TableCell
                            key={column.id}
                            wrapperClassName={`px-3 py-2 ${
                              colIndex === 0 ? 'w-3/4' : ''
                            } ${colIndex === 1 ? 'w-1/4' : ''}`}
                          >
                            {colIndex === 0 ? (
                              <div>
                                <p className="text-base-900 text-sm">
                                  {test.name}
                                </p>
                                <p className="text-base-500 text-sm">
                                  {test.folder}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <img
                                      className="h-5 w-5"
                                      src={getOSIcon('chrome')}
                                      alt="android icon"
                                    />
                                    <p className="text-base-500">Chrome 112</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <img
                                      className="h-4 w-3"
                                      src={getOSIcon('mac')}
                                      alt="android icon"
                                    />
                                    <p className="text-base-500">Ventura</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="minimal"
                                onClick={onSliderOpenClick}
                              >
                                View in log
                              </Button>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
      <div
        className="fixed bottom-0 right-0 z-[15] bg-white"
        style={{
          width: 'calc((100vw - 256px) / 2)'
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
