import React from 'react';
import { useSelector } from 'react-redux';
import { MdFilterAlt, MdHideSource } from '@browserstack/bifrost';
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
    onApplyFilters,
    onCloseClick,
    onFilterButtonClick,
    onUpdateImpact,
    onInputBoxChange,
    onTabSelect,
    onTagClose,
    generateData,
    showHiddenIssues,
    onHiddenIssueClick,
    onUpdateFilters
  } = useIssues();
  const violations = generateData();
  const showEmptyScreen = violations.every(
    ({ violation }) => violation.nodes.length === 0
  );

  console.log('reportFilters.impact: ', reportFilters.impact);

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
    <SectionsDataContext.Provider value={{ sectionData, violations }}>
      <div
      // className={classNames('issues__content-wrapper', {
      //   'issues__content-wrapper--half': isHalfView
      // })}
      >
        <ASModal show={isOpen} size="lg" onOverlayClick={onCloseClick}>
          <ASModalHeader handleDismissClick={onCloseClick} heading="Filters" />
          <ASModalBody>
            <div className="mb-6">
              <p className="text-base-700 mr-4 mb-4 text-sm font-medium">
                Severity
              </p>
              <div className="flex">
                {severityOptions.map(({ label, value }) => (
                  <ASCheckbox
                    data={{ label, value }}
                    border={false}
                    wrapperClass="pt-0 w-24 mr-5"
                    checked={intermediateFiltersImpactValues.includes(value)}
                    onChange={(val) => onInputBoxChange(value, val)}
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
                value={reportFilters.impact}
                // placeholder="Select..."
              />
            </div>
            <div className="mb-6">
              <p className="text-base-700 mb-1 text-sm">Components</p>
              <ASComboBox
                isMultiSelect
                onChange={(values) => onUpdateFilters('component', values)}
                options={componentIds}
                // value={reportFilters.impact}
                // placeholder="Select..."
              />
            </div>
            <div className="mb-6">
              <p className="text-base-700 mb-1 text-sm">Category</p>
              <ASComboBox
                isMultiSelect
                onChange={(values) => onUpdateFilters('category', values)}
                options={categories}
                // value={reportFilters.impact}
                // placeholder="Select..."
              />
            </div>
            {/* <SelectBox
              isMulti
              isSearch
              label="Pages"
              wrapperClassName="issues__select"
              menuOptions={urls}
              defaultSelected={intermediateFilters.page.map((value) => ({
                label: value,
                value
              }))}
              placeholder="Select"
              onChange={(_, values) => onUpdateFilters('page', values)}
            />
            <SelectBox
              isMulti
              isSearch
              label="Components"
              wrapperClassName="issues__select"
              menuOptions={componentIds}
              defaultSelected={intermediateFilters.component.map((value) => ({
                label: value,
                value
              }))}
              placeholder="Select"
              onChange={(_, values) => onUpdateFilters('component', values)}
            />
            <SelectBox
              isMulti
              isSearch
              label="Category"
              wrapperClassName="issues__select"
              menuOptions={categories}
              defaultSelected={intermediateFilters.category.map((value) => ({
                label: value,
                value
              }))}
              placeholder="Select"
              onChange={(_, values) => onUpdateFilters('category', values)}
            /> */}
            <ASCheckbox
              border={false}
              wrapperClass="pt-0"
              data={{
                label: "Show only 'Needs Review' Issues",
                value: 'needsReview'
              }}
              checked={intermediateFilters.showNeedsReviewIssues}
              onChange={(value) => onInputBoxChange('', value, true)}
            />
          </ASModalBody>
          <ASModalFooter position="right ">
            <ASButton onClick={onCloseClick} colors="white">
              Cancel
            </ASButton>
            <ASButton onClick={onApplyFilters}>OK</ASButton>
          </ASModalFooter>
        </ASModal>
        {showHiddenIssues && (
          <div>
            {/* <ASButton
              icon={<ArrowBackIcon />}
              modifier="grey"
              onClick={() => onHiddenIssueClick(false)}
              size="small"
              text=""
              type="subtle"
            >
              Back
            </ASButton> */}
            <p> Showing Hidden Issues </p>
          </div>
        )}
        <div>
          <div className="flex items-center justify-between py-4 px-6">
            <div>
              {issueTabs.map(({ label, value }, index) => (
                <ASButton
                  wrapperClassName={
                    index === 0 ? 'rounded-r-none' : 'rounded-l-none border-l-0'
                  }
                  onClick={() => onTabSelect(value)}
                  colors="white"
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
                  wrapperClassName="ml-2"
                  onClick={onFilterButtonClick}
                  isIconOnlyButton
                />
              )}
              {!showHiddenIssues && !hasFilters && (
                <ASButton
                  size="small"
                  colors="white"
                  wrapperClassName="ml-2"
                  onClick={() => onHiddenIssueClick(true)}
                  icon={<MdHideSource />}
                  isIconOnlyButton
                />
              )}
            </div>
            {/* {Object.entries(reportFilters).map(([key, values]) =>
              values.length ? (
                <ASBadge
                  readonly
                  size="large"
                  text={getKeyName(key, values)}
                  onClick={onFilterButtonClick}
                  onClose={() => onTagClose(key)}
                  wrapperClassName="issues__tag"
                />
              ) : null
            )} */}
            {/* {reportFilters.showNeedsReviewIssues ? (
              <ASBadge
                hasDot={false}
                hasRemoveButton
                isRounded={false}
                text="Needs Review"
                size="large"
                onClose={() => onTagClose('showNeedsReviewIssues')}
              />
            ) : null}
            {hasFilters && (
              <ASBadge
                readonly
                size="large"
                text="Clear all"
                onClose={() => onTagClose('all')}
                wrapperClassName="issues__tag"
              />
            )} */}
          </div>
          <div className="bg-base-100 px-6 py-3">
            <p className="text-base-500 border-base-300 w-fit border-r pr-4 text-sm">
              Filters
            </p>
          </div>
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
            <>
              <div className="">
                <Accordion />
              </div>
              {isHalfView && sectionData && (
                <div>
                  <IssueItem />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SectionsDataContext.Provider>
  );
}
