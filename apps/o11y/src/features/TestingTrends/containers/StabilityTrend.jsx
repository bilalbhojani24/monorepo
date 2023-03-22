import React, { useCallback, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import StabilityLineGraph from 'features/TestingTrends/components/StabilityLineGraph';
import StabilityTable from 'features/TestingTrends/components/StabilityTable';

export default function StabilityTrend() {
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
        <StabilityTable
          handleBuildSelect={handleBuildSelect}
          selectedBuild={selectedBuild}
        />
      </div>
      {!!selectedBuild && (
        <div className="flex-1 px-5">
          <StabilityLineGraph buildId={selectedBuild} key={selectedBuild} />
        </div>
      )}
    </div>
  );
}
