import React from 'react';
import { O11yHyperlink, O11yTooltip } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import { DOC_KEY_MAPPING } from 'constants/common';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { getDocUrl } from 'utils/common';

import { aggregateColors, TEST_LIST_FILTERS_INTERACTIONS } from '../constants';

import DividedPill from './DividedPill';

const areAllTbi = (data) => {
  const toBeInvestigated = 'To be Investigated';
  return Object.entries(data)?.every(
    (item) =>
      (item[1] === 0 && item[0] !== toBeInvestigated) ||
      (item[1] !== 0 && item[0] === toBeInvestigated)
  );
};

const areAllZero = (data) => Object.values(data)?.every((item) => item === 0);

function FailureCategoriesPill({
  data,
  logBuildListingInteracted,
  navigateToTestPage
}) {
  const handleIssueTypeClicked = (type) => {
    navigateToTestPage(
      ADV_FILTER_TYPES.failureCategories.key,
      type,
      TEST_LIST_FILTERS_INTERACTIONS[type]
    );
  };

  const noDefectClicked = () =>
    logBuildListingInteracted(TEST_LIST_FILTERS_INTERACTIONS['No Defect']);

  if (isEmpty(data?.issueTypeAggregate)) {
    return null;
  }

  if (areAllZero(data.issueTypeAggregate)) {
    return (
      <p
        role="presentation"
        className="text-sm"
        onClick={noDefectClicked}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            noDefectClicked();
          }
        }}
      >
        No Failures
      </p>
    );
  }
  if (areAllTbi(data.issueTypeAggregate)) {
    return (
      <O11yTooltip
        theme="dark"
        triggerWrapperClassName="w-full"
        content={
          <div className="mx-4">
            <p className="text-base-50 mb-2 text-sm font-medium">
              Manual investigation yet to start
            </p>
            <p className="text-base-300 mb-2 text-sm">
              Start tagging failures manually for Auto Analysis to kick-in
            </p>
            <O11yHyperlink
              wrapperClassName="text-base-50 text-sm font-medium underline"
              target="_blank"
              href={getDocUrl({ path: DOC_KEY_MAPPING.auto_analyser })}
            >
              Learn more
            </O11yHyperlink>
          </div>
        }
      >
        <PropagationBlocker>
          <p
            role="presentation"
            onClick={() => handleIssueTypeClicked('To be Investigated')}
          >
            To be investigated
          </p>
        </PropagationBlocker>
      </O11yTooltip>
    );
  }
  return (
    <O11yTooltip
      size="lg"
      theme="light"
      placementSide="top"
      triggerWrapperClassName="flex overflow-hidden rounded-xl w-28 m-auto"
      content={
        <div className="mx-4 w-96">
          <div className="mb-2 flex overflow-hidden rounded-xl">
            <DividedPill
              data={data}
              onIssueTypeClicked={handleIssueTypeClicked}
            />
          </div>
          <ul>
            {Object.keys(data?.issueTypeAggregate)?.map(
              (item) =>
                !!data?.issueTypeAggregate[item] && (
                  <li key={item}>
                    <p className="flex items-center justify-between">
                      <span>
                        <span
                          className="mr-2 inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: aggregateColors[item]
                          }}
                          data-d={data?.issueTypeAggregate[item]}
                        />
                        <span className="text-sm">{item}</span>
                      </span>
                      <span className="text-sm font-medium">
                        {data?.issueTypeAggregate[item]}
                      </span>
                    </p>
                  </li>
                )
            )}
          </ul>
        </div>
      }
    >
      <DividedPill data={data} onIssueTypeClicked={handleIssueTypeClicked} />
    </O11yTooltip>
  );
}

FailureCategoriesPill.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  logBuildListingInteracted: PropTypes.func.isRequired,
  navigateToTestPage: PropTypes.func.isRequired
};

export default FailureCategoriesPill;
