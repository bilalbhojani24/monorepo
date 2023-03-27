import React, { useCallback, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PerformanceGraph from 'features/TestingTrends/components/PerformanceGraph';

import PerformanceTable from '../components/PerformanceTable';

export default function PerformanceTrend() {
  const [selectedBuild, setSelectedBuild] = useState('');
  const handleBuildSelect = useCallback((id) => {
    setSelectedBuild(id);
  }, []);

  return (
    <div className="flex">
      <div
        className={twClassNames('w-2/5 flex flex-col', {
          'w-full': !selectedBuild
        })}
      >
        <PerformanceTable
          handleBuildSelect={handleBuildSelect}
          selectedBuild={selectedBuild}
        />
      </div>
      {!!selectedBuild && (
        <div className="flex-1 px-5">
          <PerformanceGraph buildName={selectedBuild} key={selectedBuild} />
        </div>
      )}
    </div>
  );
}
