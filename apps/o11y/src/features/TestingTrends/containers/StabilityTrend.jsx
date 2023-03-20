import React, { useCallback, useState } from 'react';
import { Button, MdDragIndicator } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import StabilityLineGraph from 'features/TestingTrends/components/StabilityLineGraph';
import StabilityTable from 'features/TestingTrends/components/StabilityTable';

import { TREND_CARDS } from '../constants';

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
        <p className="flex items-center justify-between bg-white px-5 pt-5 pb-4">
          {TREND_CARDS.stability.title}
          <Button
            colors="white"
            onClick={() => {}}
            icon={<MdDragIndicator />}
            isIconOnlyButton
            size="small"
            wrapperClassName="border-none to-test-trend__dragHandler invisible group-hover:visible"
          />
        </p>
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
