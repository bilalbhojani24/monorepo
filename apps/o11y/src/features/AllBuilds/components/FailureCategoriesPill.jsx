import React from 'react';
import { O11yHyperlink, O11yTooltip } from 'common/bifrostProxy';
import { DOC_KEY_MAPPING } from 'constants/common';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { getDocUrl } from 'utils/common';

import { aggregateColors } from '../constants';

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

function FailureCategoriesPill({ data, logBuildListingInteracted }) {
  const investigationRequiredClicked = () =>
    logBuildListingInteracted('to_be_investigated_clicked');
  const noDefectClicked = () => logBuildListingInteracted('no_defect_clicked');
  if (isEmpty(data?.issueTypeAggregate)) {
    return null;
  }
  if (areAllZero(data.issueTypeAggregate)) {
    return (
      <O11yTooltip
        theme="dark"
        placementSide="top"
        triggerWrapperClassName="w-full"
        content={
          <p
            role="presentation"
            className="text-base-100 px-2 text-sm"
            onClick={noDefectClicked}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                noDefectClicked();
              }
            }}
          >
            No Failures Found
          </p>
        }
      >
        <div
          label="No Failures Found"
          className="bg-base-200 h-3 w-full rounded-xl"
          tabIndex={0}
          role="button"
        />
      </O11yTooltip>
    );
  }
  if (areAllTbi(data.issueTypeAggregate)) {
    return (
      <O11yTooltip
        theme="dark"
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
        <p
          role="presentation"
          className="flex w-full justify-start"
          onClick={investigationRequiredClicked}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              investigationRequiredClicked();
            }
          }}
        >
          Investigation required
        </p>
      </O11yTooltip>
    );
  }
  return (
    <O11yTooltip
      size="lg"
      theme="light"
      placementSide="top"
      triggerWrapperClassName="flex overflow-hidden rounded-xl"
      content={
        <div className="mx-4 w-96">
          <div className="mb-2 flex overflow-hidden rounded-xl">
            <DividedPill
              data={data}
              logBuildListingInteracted={logBuildListingInteracted}
            />
          </div>
          <ul>
            {Object.keys(data?.issueTypeAggregate)?.map(
              (item) =>
                !!data?.issueTypeAggregate[item] && (
                  <li key={item}>
                    <span
                      className="mr-2 inline-block h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: aggregateColors[item]
                      }}
                      data-d={data?.issueTypeAggregate[item]}
                    />
                    <span>{item}</span>
                  </li>
                )
            )}
          </ul>
        </div>
      }
    >
      <DividedPill
        data={data}
        logBuildListingInteracted={logBuildListingInteracted}
      />
    </O11yTooltip>
  );
}

FailureCategoriesPill.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  logBuildListingInteracted: PropTypes.func.isRequired
};

export default FailureCategoriesPill;
