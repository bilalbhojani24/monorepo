import React, { useCallback, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import CardHeader from 'features/TestingTrends/components/CardHeader';
import StabilityLineGraph from 'features/TestingTrends/components/StabilityLineGraph';
import StabilityTable from 'features/TestingTrends/components/StabilityTable';
import PropTypes from 'prop-types';

export default function StabilityTrend({ title }) {
  const [selectedBuild, setSelectedBuild] = useState('');
  const handleBuildSelect = useCallback((id) => {
    setSelectedBuild(id);
  }, []);

  return (
    <div className="flex h-full">
      <div
        className={twClassNames('flex flex-col w-2/5', {
          'w-full': !selectedBuild
        })}
      >
        <CardHeader title={title} />
        <StabilityTable
          handleBuildSelect={handleBuildSelect}
          selectedBuild={selectedBuild}
        />
      </div>
      {!!selectedBuild && (
        <div className="flex-1 p-5">
          <StabilityLineGraph buildId={selectedBuild} key={selectedBuild} />
        </div>
      )}
    </div>
  );
}

StabilityTrend.propTypes = {
  title: PropTypes.string.isRequired
};
