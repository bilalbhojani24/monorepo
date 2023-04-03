/* eslint-disable tailwindcss/no-custom-classname */
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import PropTypes from 'prop-types';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';

export default function FailureByFoldersTooltip({ data }) {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleActionClick = () => {
    logInsightsInteractionEvent({
      interaction: 'failure_by_folder_view_tests_clicked'
    });

    // Clearing test runs before landing on test listing to fetch new tests based on applied filter
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    const searchString = `?tab=tests&folder=${data.id}`;
    navigate({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
  };
  return (
    <div className="ti-fbm__tooltip-body">
      <section className="ti-fbm__tooltip-body-section">
        <p className="ti-fbm__tooltip-text ti-fbm__tooltip-title">
          {data.name}
        </p>
        <p className="ti-fbm__tooltip-text">
          <span
            className="ti-fbm__tooltip-text-dot"
            style={{ backgroundColor: data?.color }}
          />
          <span>Failure rate: </span>
          <span className="ti-fbm__tooltip-text-count">
            {data?.colorValue}%
          </span>
        </p>
      </section>
      <section className="ti-fbm__tooltip-body-section">
        <p className="ti-fbm__tooltip-text">
          <span> Failed tests: </span>
          <span className="ti-fbm__tooltip-text-count">
            {data?.failedTests}
          </span>
        </p>
        <p className="ti-fbm__tooltip-text">
          <span> No. of tests: </span>
          <span className="ti-fbm__tooltip-text-count">{data?.value}</span>
        </p>
      </section>
      <section className="ti-fbm__tooltip-body-section ti-fbm__tooltip-body-section--bottom">
        <Button
          wrapperClassName="ti-fbm__tooltip-btn"
          onClick={handleActionClick}
        >
          Click to view tests
        </Button>
      </section>
    </div>
  );
}

FailureByFoldersTooltip.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
