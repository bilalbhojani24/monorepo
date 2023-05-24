import React from 'react';
import {
  Badge,
  Button,
  MdArrowBack,
  MdFilterAlt,
  MdHideSource,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { FILTER_KEYS, issueTabs, severityOptions } from 'constants';
import PropTypes from 'prop-types';

import useActiveFilters from './useActiveFilters';

export default function ActiveFilters({
  sectionsDataContext,
  isShowingHiddenIssueButton,
  wrapperClassName
}) {
  const {
    hasFilters,
    showHiddenIssues,
    activeSwitch,
    buildFilters,
    onFilterButtonClick,
    onTabSelect,
    onHiddenIssueClick,
    onTagClose,
    onUpdateImpact
  } = useActiveFilters(sectionsDataContext);

  const hasFilterOrHiddenView = showHiddenIssues || hasFilters;

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
    if (key === FILTER_KEYS.TAGS) {
      text = hasMultipleValues ? 'tags' : 'tag';
    }
    if (key === FILTER_KEYS.TESTS) {
      text = hasMultipleValues ? 'tests' : 'test';
    }
    if (key === FILTER_KEYS.FILES) {
      text = hasMultipleValues ? 'files' : 'file';
    }
    text = `${values.length} ${text}`;
    return text;
  };

  return (
    <div
      className={twClassNames(
        'bg-base-50 border-base-200 fixed z-10 w-full border-b',
        wrapperClassName
      )}
      // style={{ width: 'calc(100% - 256px)' }}
    >
      <div className="flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {showHiddenIssues && (
            <Button
              colors="white"
              onClick={() => onHiddenIssueClick(false)}
              size="small"
              icon={<MdArrowBack className="text-xl" />}
              wrapperClassName="mr-4"
              isIconOnlyButton
            />
          )}
          {issueTabs.map(({ label, value }, index) => (
            <Button
              wrapperClassName={twClassNames({
                'rounded-l-none border-l-0': index === 1,
                'border-r-none border-r-0':
                  index === 0 && activeSwitch !== value,
                'border-l-1 border-brand-500':
                  index === 1 && activeSwitch === value,
                'border-brand-500': activeSwitch === value,
                'rounded-r-none': index === 0
              })}
              onClick={() => onTabSelect(value)}
              colors="white"
              size="small"
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="flex">
          <div className="mr-4 w-36">
            <SelectMenu
              onChange={onUpdateImpact}
              value={buildFilters.impact}
              isMulti
            >
              <SelectMenuTrigger placeholder="Severity" />
              <SelectMenuOptionGroup>
                {severityOptions.map((item) => (
                  <SelectMenuOptionItem
                    key={item.value}
                    option={item}
                    wrapperClassName="text-sm font-semibold text-base-900"
                  />
                ))}
              </SelectMenuOptionGroup>
            </SelectMenu>
          </div>
          {!showHiddenIssues && (
            <Button
              icon={<MdFilterAlt className="text-xl" />}
              colors="white"
              size="small"
              wrapperClassName="mr-4"
              onClick={onFilterButtonClick}
              isIconOnlyButton
            />
          )}
          {!showHiddenIssues && !hasFilters && isShowingHiddenIssueButton && (
            <Button
              colors="white"
              onClick={() => onHiddenIssueClick(true)}
              size="small"
              icon={<MdHideSource className="text-xl" />}
              isIconOnlyButton
            />
          )}
        </div>
      </div>
      {hasFilterOrHiddenView ? (
        <div className="bg-base-100 px-6 py-3">
          {showHiddenIssues ? (
            <Badge
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
              {Object.entries(buildFilters).map(([key, values]) =>
                values.length ? (
                  <Badge
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
              {buildFilters.showNeedsReviewIssues ? (
                <Badge
                  hasDot={false}
                  hasRemoveButton
                  isRounded
                  text="Needs review"
                  size="large"
                  wrapperClassName="bg-white ml-4"
                  onClose={() => onTagClose('showNeedsReviewIssues')}
                />
              ) : null}
              <Button
                onClick={() => onTagClose('all')}
                size="small"
                colors="white"
                wrapperClassName="ml-4"
                variant="minimal"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

ActiveFilters.propTypes = {
  sectionsDataContext: PropTypes.objectOf(PropTypes.any),
  wrapperClassName: PropTypes.string,
  isShowingHiddenIssueButton: PropTypes.bool
};

ActiveFilters.defaultProps = {
  sectionsDataContext: {},
  wrapperClassName: '',
  isShowingHiddenIssueButton: true
};
