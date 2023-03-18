import React, { useCallback, useState } from 'react';
import { Button, MdDragIndicator } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PerformanceGraph from 'features/TestingTrends/components/PerformanceGraph';

import PerformanceTable from '../components/PerformanceTable';
import { TREND_CARDS } from '../constants';

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
        <p className="flex items-center justify-between bg-white px-5 pt-5 pb-4">
          {TREND_CARDS.performance.title}
          <Button
            colors="white"
            onClick={() => {}}
            icon={<MdDragIndicator />}
            isIconOnlyButton
            size="small"
            wrapperClassName="border-none to-test-trend__dragHandler hidden group-hover:block"
          />
        </p>
        <PerformanceTable
          handleBuildSelect={handleBuildSelect}
          selectedBuild={selectedBuild}
        />
      </div>
      {!!selectedBuild && (
        <div className="flex-1 p-5">
          <PerformanceGraph buildId={selectedBuild} key={selectedBuild} />
        </div>
      )}
    </div>
  );
}
