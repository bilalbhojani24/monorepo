import React, { useContext } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import PropTypes from 'prop-types';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';

export default function FailureByFoldersTooltip({ data }) {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  // const dispatch = useDispatch();
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
    <div className="flex flex-col-reverse">
      <section className="flex flex-col gap-1 py-0 px-2">
        <p className="text-xs font-medium">{data.name}</p>
        <p className="text-xs">
          <span
            className="mb-0.5 inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: data?.color }}
          />
          <span>Failure rate: </span>
          <span className="font-semibold">{data?.colorValue}%</span>
        </p>
      </section>
      <section className="flex flex-col gap-1 py-0 px-1">
        <p className="text-xs">
          <span> Failed tests: </span>
          <span className="font-semibold">{data?.failedTests}</span>
        </p>
        <p className="text-xs">
          <span> No. of tests: </span>
          <span className="font-semibold">{data?.value}</span>
        </p>
      </section>
      <section className="pointer-events-auto flex flex-col gap-1 py-0 px-1">
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
