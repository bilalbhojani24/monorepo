import React from 'react';
import { useSelector } from 'react-redux';
import { MdArrowBack, MdFilterAlt, MdHideSource } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import IssuesNotFound from 'assets/not_found.svg';
import { FILTER_KEYS, issueTabs } from 'constants';
import { SectionsDataContext } from 'features/Report/context/SectionsDataContext';
import {
  getActiveComponentId,
  getIsShowingIssue,
  getReportFilters,
  getUniqFilterValues
} from 'features/Report/slice/selector';
import {
  ASBadge,
  ASButton,
  ASCheckbox,
  ASComboBox,
  ASModal,
  ASModalBody,
  ASModalFooter,
  ASModalHeader,
  ASSelectMenu
} from 'middleware/bifrost';

// import { handleClickByEnterOrSpace } from 'utils/helper';
import Accordion from '../Accordion';
import IssueItem from '../Accordion/IssueItem';

import useIssues from './useIssues';

export default function Issues() {
  const activeComponentId = useSelector(getActiveComponentId);
  const isShowingIssue = useSelector(getIsShowingIssue);
  const reportFilters = useSelector(getReportFilters);
  const { urls, componentIds, categories } = useSelector(getUniqFilterValues);
  const {
    activeSwitch,
    isOpen,
    intermediateFilters,
    sectionData,
    showHiddenIssues,
    onApplyFilters,
    onCloseClick,
    onFilterButtonClick,
    onUpdateImpact,
    onInputBoxChange,
    onTabSelect,
    onTagClose,
    generateData,
    onNeedsReviewChecked,
    onHiddenIssueClick,
    onUpdateFilters
  } = useIssues();
  const violations = generateData();
  const showEmptyScreen = violations.every(
    ({ violation }) => violation.nodes.length === 0
  );

  const getKeyName = (key, values) => {
    const hasMultipleValues = values.length > 1;
    let text;
    if (key === FILTER_KEYS.CATEGORY) {
      text = hasMultipleValues ? 'categories' : 'category';
    }
    if (key === FILTER_KEYS.PAGE) {
      text = hasMultipleValues ? 'pages' : 'page';
    }
    if (key === FILTER_KEYS.COMPONENT) {
      text = hasMultipleValues ? 'components' : 'component';
    }
    if (key === FILTER_KEYS.IMPACT) {
      text = hasMultipleValues ? 'severities' : 'severity';
    }
    text = `${values.length} ${text}`;
    return text;
  };

  // check if needs review is true OR check if any other filters is applied. Filters are combined as array, hence length check.
  const hasFilters =
    reportFilters.showNeedsReviewIssues ||
    Object.values(reportFilters).filter((item) => item.length > 0).length > 0;

  const isHalfView = activeComponentId && isShowingIssue;

  const severityOptions = [
    {
      label: 'Critical',
      value: 'critical'
    },
    {
      label: 'Serious',
      value: 'serious'
    },
    {
      label: 'Moderate',
      value: 'moderate'
    },
    {
      label: 'Minor',
      value: 'minor'
    }
  ];

  const intermediateFiltersImpactValues = intermediateFilters.impact.map(
    ({ value }) => value
  );

  return (
    <SectionsDataContext.Provider
      value={{ sectionData, violations, isHalfView }}
    >
      <div>
        <ASModal show={isOpen} size="lg" onOverlayClick={onCloseClick}>
          <ASModalHeader handleDismissClick={onCloseClick} heading="Filters" />
          <ASModalBody>
            <div className="mb-6">
              <p className="text-base-700 mr-4 mb-4 text-sm font-medium">
                Severity
              </p>
              <div className="flex">
                {severityOptions.map((option) => (
                  <ASCheckbox
                    data={option}
                    border={false}
                    wrapperClassName="pt-0 w-24 mr-5"
                    checked={intermediateFiltersImpactValues.includes(
                      option.value
                    )}
                    onChange={(e) => onInputBoxChange(option, e)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-base-700 mb-1 text-sm">Pages</p>
              <ASComboBox
                isMulti
                onChange={(values) => onUpdateFilters('page', values)}
                options={urls}
                value={intermediateFilters.page}
                // placeholder="Select..."
              />
            </div>
            <div className="mb-6">
              <p className="text-base-700 mb-1 text-sm">Components</p>
              <ASComboBox
                isMulti
                onChange={(values) => onUpdateFilters('component', values)}
                options={componentIds}
                value={intermediateFilters.component}
                // placeholder="Select..."
              />
            </div>
            <div className="mb-6">
              <p className="text-base-700 mb-1 text-sm">Category</p>
              <ASComboBox
                isMulti
                onChange={(values) => onUpdateFilters('category', values)}
                options={categories}
                value={intermediateFilters.category}
                // placeholder="Select..."
              />
            </div>
            <ASCheckbox
              border={false}
              wrapperClassName="pt-0"
              data={{
                label: "Show only 'Needs Review' Issues",
                value: 'needsReview'
              }}
              checked={intermediateFilters.showNeedsReviewIssues}
              onChange={onNeedsReviewChecked}
            />
          </ASModalBody>
          <ASModalFooter position="right ">
            <ASButton onClick={onCloseClick} colors="white">
              Cancel
            </ASButton>
            <ASButton onClick={onApplyFilters}>OK</ASButton>
          </ASModalFooter>
        </ASModal>
        <div>
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
              {showHiddenIssues && (
                <ASButton
                  colors="white"
                  onClick={() => onHiddenIssueClick(false)}
                  size="small"
                  icon={<MdArrowBack className="text-xl" />}
                  wrapperClassName="mr-4"
                  isIconOnlyButton
                />
              )}
              {issueTabs.map(({ label, value }, index) => (
                <ASButton
                  wrapperClassName={
                    index === 0 ? 'rounded-r-none' : 'rounded-l-none border-l-0'
                  }
                  onClick={() => onTabSelect(value)}
                  colors="white"
                  size="small"
                >
                  {label}
                </ASButton>
              ))}
            </div>
            <div className="flex">
              <ASSelectMenu
                isMultiSelect
                onChange={onUpdateImpact}
                options={severityOptions}
                placeholder="Severity"
                value={reportFilters.impact}
              />
              {!showHiddenIssues && (
                <ASButton
                  icon={<MdFilterAlt className="text-xl" />}
                  colors="white"
                  size="small"
                  wrapperClassName="mr-4"
                  onClick={onFilterButtonClick}
                  isIconOnlyButton
                />
              )}
              {!showHiddenIssues && !hasFilters && (
                <ASButton
                  colors="white"
                  onClick={() => onHiddenIssueClick(true)}
                  size="small"
                  icon={<MdHideSource className="text-xl" />}
                  isIconOnlyButton
                />
              )}
            </div>
          </div>
          {showHiddenIssues || hasFilters ? (
            <div className="bg-base-100 px-6 py-3">
              {showHiddenIssues ? (
                <ASBadge
                  hasDot={false}
                  hasRemoveButton
                  isRounded
                  size="large"
                  wrapperClassName="bg-white"
                  onClose={() => onHiddenIssueClick(false)}
                  text="Hidden issues"
                />
              ) : (
                <div className="flex">
                  <p className="text-base-500 border-base-300 w-fit border-r pr-4 text-sm">
                    Filters
                  </p>
                  {Object.entries(reportFilters).map(([key, values]) =>
                    values.length ? (
                      <ASBadge
                        readonly
                        size="large"
                        hasRemoveButton
                        text={getKeyName(key, values)}
                        onClick={onFilterButtonClick}
                        onClose={() => onTagClose(key)}
                        wrapperClassName="bg-white ml-4"
                      />
                    ) : null
                  )}
                  {reportFilters.showNeedsReviewIssues ? (
                    <ASBadge
                      hasDot={false}
                      hasRemoveButton
                      isRounded
                      text="Needs Review"
                      size="large"
                      wrapperClassName="bg-white ml-4"
                      onClose={() => onTagClose('showNeedsReviewIssues')}
                    />
                  ) : null}
                  <ASButton
                    onClick={() => onTagClose('all')}
                    size="small"
                    colors="white"
                    wrapperClassName="ml-4"
                    variant="minimal"
                  >
                    Clear all
                  </ASButton>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div>
          {showEmptyScreen ? (
            <div className="mt-8 mb-5 flex w-full flex-col items-center justify-center">
              <img
                src={IssuesNotFound}
                alt="No Issues Found"
                className="w-80"
              />
              <p className="text-base-500 text-sm">No Issues Found</p>
            </div>
          ) : (
            <div className="border-base-200 flex border-t">
              <div
                className={twClassNames('w-full', {
                  'w-2/4': isHalfView && sectionData
                })}
              >
                <Accordion />
              </div>
              {isHalfView && sectionData && (
                <div className="w-2/4">
                  <IssueItem />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionsDataContext.Provider>
  );
}
