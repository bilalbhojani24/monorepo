import React, { useContext } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import PropTypes from 'prop-types';

export default function FailureByFoldersTooltip({ data }) {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleActionClick = () => {
    logInsightsInteractionEvent({
      interaction: 'failure_by_folder_view_tests_clicked'
    });

    window.scroll(0, 0);
    const searchString = `?tab=tests&folder=${data.id}`;
    navigate({ search: searchString });
  };
  return (
    <div className="flex flex-col p-2 text-white">
      <section className="flex flex-col gap-1">
        <p className="text-xs font-medium">{data.name}</p>
        <p className="text-xs">
          <span
            className="mb-0.5 mr-1 inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: data?.color }}
          />
          <span>Failure rate: </span>
          <span className="font-semibold">{data?.colorValue}%</span>
        </p>
      </section>
      <section className="flex flex-col gap-1">
        <p className="text-xs">
          <span> Failed tests: </span>
          <span className="font-semibold">{data?.failedTests}</span>
        </p>
        <p className="text-xs">
          <span> No. of tests: </span>
          <span className="font-semibold">{data?.value}</span>
        </p>
      </section>
      <section className="pointer-events-auto flex flex-col gap-1">
        <Button
          wrapperClassName="font-medium flex items-center gap-1"
          onClick={handleActionClick}
          variant="minimal"
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
