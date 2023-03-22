import React, { useMemo } from 'react';
import { O11yComboBox, O11ySwitch } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const FilterSlideoverBody = ({ filters, setFilters, allBuildNames }) => {
  const updateFilters = (selectedValues) => {
    setFilters((state) => ({ ...state, buildNames: selectedValues }));
  };

  const toggleMuted = (val) => {
    setFilters((state) => ({ ...state, isMuted: val }));
  };

  const toggleFlaky = (val) => {
    setFilters((state) => ({ ...state, isFlaky: val }));
  };

  const buildNameOptions = useMemo(() => {
    if (allBuildNames.length > 0) {
      return allBuildNames.map((build) => ({ label: build, value: build }));
    }
    return [];
  }, [allBuildNames]);

  return (
    <>
      <div className="mb-6">
        <O11yComboBox
          isMulti
          placeholder="Select"
          label="Builds"
          options={buildNameOptions}
          onChange={(selectedValues) => {
            updateFilters(selectedValues);
          }}
          value={filters.buildNames}
          checkPosition="left"
        />
      </div>
      <div className="mb-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex grow flex-col">
            <span className="text-base-900 text-sm font-medium">
              Show Flaky Tests
            </span>
          </div>
          <O11ySwitch checked={filters.isFlaky} onChange={toggleFlaky} />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex grow flex-col">
            <span className="text-base-900 text-sm font-medium">
              Show Muted Tests
            </span>
          </div>
          <O11ySwitch checked={filters.isMuted} onChange={toggleMuted} />
        </div>
      </div>
    </>
  );
};

FilterSlideoverBody.propTypes = {
  filters: PropTypes.shape({
    isFlaky: PropTypes.bool.isRequired,
    isMuted: PropTypes.bool.isRequired,
    buildNames: PropTypes.arrayOf({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  allBuildNames: PropTypes.arrayOf({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default FilterSlideoverBody;
