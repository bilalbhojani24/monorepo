import React from 'react';
import { useSelector } from 'react-redux';
import IssuesNotFound from 'assets/not_found.svg';
import { FILTER_KEYS, issueTabs } from 'constants';
import { SectionsDataContext } from 'features/Report/context/SectionsDataContext';
import {
  getActiveComponentId,
  getIsShowingIssue,
  getReportFilters,
  getUniqFilterValues
} from 'features/Report/slice/selector';
import { ASBadge, ASButton, ASSelectMenu } from 'middleware/bifrost';
// import { Button } from 'trike/Button';
// import Checkbox from 'trike/Checkbox';
// import { ArrowBackIcon, FilterListIcon } from 'trike/Icons';
// import { Actions, Content, Header, Modal } from 'trike/Modal';
// import SelectBox from 'trike/SelectBox/container/SelectBox';
// import TagsComponent from 'trike/TagsComponent/components/TagsComponent';
import { handleClickByEnterOrSpace } from 'utils/helper';

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

  return (
    <SectionsDataContext.Provider value={{ sectionData, violations }}>
      <div
      // className={classNames('issues__content-wrapper', {
      //   'issues__content-wrapper--half': isHalfView
      // })}
      >
        {/* <Modal
          id="filter-modal"
          isOpen={isOpen}
          wrapperClassName="issues__filter-modal"
          size="md"
          position="center"
          onClose={onCloseClick}
        >
          <Header>Filters</Header>
          <Content>
            <div>
              <p className="issues__checkbox-group-title">Severity</p>
              <div className="issues__checkbox-group">
                <Checkbox
                  id="critical"
                  labelText="Critical"
                  className="issues__checkbox"
                  checked={intermediateFilters.impact.includes('critical')}
                  onChange={(value) => onInputBoxChange('critical', value)}
                />
                <Checkbox
                  id="serious"
                  labelText="Serious"
                  className="issues__checkbox"
                  checked={intermediateFilters.impact.includes('serious')}
                  onChange={(value) => onInputBoxChange('serious', value)}
                />
                <Checkbox
                  id="moderate"
                  labelText="Moderate"
                  className="issues__checkbox"
                  checked={intermediateFilters.impact.includes('moderate')}
                  onChange={(value) => onInputBoxChange('moderate', value)}
                />
                <Checkbox
                  id="minor"
                  labelText="Minor"
                  className="issues__checkbox"
                  checked={intermediateFilters.impact.includes('minor')}
                  onChange={(value) => onInputBoxChange('minor', value)}
                />
              </div>
            </div>
            <SelectBox
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
            />
            <Checkbox
              id="needsReview"
              labelText="Show only 'Needs Review' Issues"
              className="issues__checkbox"
              checked={intermediateFilters.showNeedsReviewIssues}
              onChange={(value) => onInputBoxChange('', value, true)}
            />
          </Content>
          <Actions position="end">
            <Button
              text="Cancel"
              type="outline"
              modifier="grey"
              onClick={onCloseClick}
            />
            <Button text="Apply" onClick={onApplyFilters} />
          </Actions>
        </Modal> */}
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
          <div>
            <div className="py-4 px-6">
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
            <div>
              <ASSelectMenu
                isMultiSelect
                onChange={onUpdateImpact}
                options={severityOptions}
                placeholder="Severity"
                value={reportFilters.impact}
              />
            </div>
            {/* {!showHiddenIssues && (
              <ASButton
                type="outline"
                // icon={<FilterListIcon />}
                // iconPlacement="left"
                // modifier="grey"
                onClick={onFilterButtonClick}
              >
                Filters
              </ASButton>
            )} */}
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
          {/* {!showHiddenIssues && !hasFilters && (
            <ASButton
              // type="outline"
              // size="small"
              // modifier="grey"
              onClick={() => onHiddenIssueClick(true)}
            >
              View Hidden Issues
            </ASButton>
          )} */}
        </div>
        <div>
          {showEmptyScreen ? (
            <div>
              <img src={IssuesNotFound} alt="No Issues Found" />
              <p>No Issues Found</p>
            </div>
          ) : (
            <>
              <Accordion />
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
