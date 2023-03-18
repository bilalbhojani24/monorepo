import React from 'react';

import { TT_DATE_RANGE } from '../constants';

export default function TestingTrendsHeader() {
  const handleClickRange = () => {};
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold">Testing Trends</span>
      <div>
        <div>
          {Object.keys(TT_DATE_RANGE).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => handleClickRange(key)}
            >
              {TT_DATE_RANGE[key].label}
            </button>
          ))}
        </div>
        {/* <SelectBox
          id="build-name-filters"
          menuOptions={buildList}
          placeholder="All Builds"
          size="default"
          wrapperClassName="to-test-trend-header__builds"
          onChange={handleBuildChange}
          isMulti={false}
          defaultSelected={activeBuild}
        /> */}
      </div>
    </div>
  );
}
