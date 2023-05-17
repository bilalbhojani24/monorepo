import React, { useContext } from 'react';
import { Button } from '@browserstack/bifrost';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import PropTypes from 'prop-types';

export default function FailureByFoldersTooltip({ data }) {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);

  const handleActionClick = () => {
    logInsightsInteractionEvent({
      interaction: 'failure_by_folder_view_tests_clicked'
    });
    applyTestListFilter({ query: `folder=${data.id}` });
  };
  return (
    <div className="flex flex-col p-3 pb-0 text-white">
      <section className="border-brand-900 flex flex-col gap-1 border-b pb-2">
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
      <section className="border-brand-900 flex flex-col gap-1 border-b py-2">
        <p className="text-xs">
          <span> Failed tests: </span>
          <span className="font-semibold">{data?.failedTests}</span>
        </p>
        <p className="text-xs">
          <span> No. of tests: </span>
          <span className="font-semibold">{data?.value}</span>
        </p>
      </section>
      <section className="pointer-events-auto flex flex-col pt-1">
        <Button
          wrapperClassName="font-medium flex items-center gap-1 text-white hover:text-white hover:bg-brand-900 -mx-3 px-4 py-1 rounded-none"
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
