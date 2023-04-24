import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import Proptype from 'prop-types';

import Button from '../../Button';
import { PICKER_LEVELS } from '../const/DateRangepickerconst';
import { PickerLevelContext } from '../context/PickerLevelContext';

const YearGrid = ({ years, minYear, maxYear }) => {
  const { setCurrentPicker, selectedYear, setSelectedYear } =
    useContext(PickerLevelContext);

  const handleClick = (year) => {
    setSelectedYear(year);
    setCurrentPicker(PICKER_LEVELS[1]);
  };

  return (
    <div className="text-base-900 mx-4 my-16 grid grid-cols-3 gap-2.5 text-sm font-normal leading-5">
      {years.map((year) => (
        <Button
          disabled={year > maxYear || year < minYear}
          onClick={() => handleClick(year)}
          className={twClassNames('h-11 w-24', {
            'text-base-300 cursor-not-allowed':
              year > maxYear || year < minYear,
            'text-white bg-black rounded': year === selectedYear,
            'text-brand-600': year === new Date().getFullYear()
          })}
        >
          {year}
        </Button>
      ))}
    </div>
  );
};

YearGrid.propTypes = {
  years: Proptype.arrayOf(Proptype.number),
  minYear: Proptype.number.isRequired,
  maxYear: Proptype.number.isRequired
};

YearGrid.defaultProps = {
  years: []
};

export default YearGrid;
