import React, { useCallback, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import CardHeader from 'features/TestingTrends/components/CardHeader';
import PerformanceGraph from 'features/TestingTrends/components/PerformanceGraph';
import PropTypes from 'prop-types';

import PerformanceTable from '../components/PerformanceTable';

export default function PerformanceTrend({ title }) {
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
        <CardHeader title={title} />
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

PerformanceTrend.propTypes = {
  title: PropTypes.string.isRequired
};
