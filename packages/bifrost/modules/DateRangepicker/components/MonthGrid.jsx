import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import Proptype from 'prop-types';

import Button from '../../Button';
import { MONTHS_DATA, PICKER_LEVELS } from '../const/DateRangepickerconst';
import { PickerLevelContext } from '../context/PickerLevelContext';

const MonthGrid = ({ minMonth, maxMonth, minYear, maxYear }) => {
  const {
    setCurrentPicker,
    selectedYear,
    selectedMonth,
    setSelectedMonth,
    localYear,
    setLocalYear
  } = useContext(PickerLevelContext);

  const handleClick = (monthNumber) => {
    setSelectedMonth(monthNumber);
    setCurrentPicker(PICKER_LEVELS[2]);
    setLocalYear(selectedYear);
  };

  return (
    <div className="text-base-900 mx-3.5 my-16 grid grid-cols-3 gap-2.5 pb-0.5 text-sm font-normal leading-5">
      {MONTHS_DATA.map((month) => (
        <Button
          disabled={
            (month.number > maxMonth && selectedYear === maxYear) ||
            (month.number < minMonth && selectedYear === minYear)
          }
          onClick={() => handleClick(month.number)}
          className={twClassNames('h-11 w-24', {
            'text-base-300 cursor-not-allowed':
              (month.number > maxMonth && selectedYear === maxYear) ||
              (month.number < minMonth && selectedYear === minYear),
            'text-white bg-black rounded':
              month.number === selectedMonth && localYear === selectedYear,
            'text-brand-600':
              month.number === new Date().getMonth() &&
              selectedYear === new Date().getFullYear()
          })}
        >
          {month.name}
        </Button>
      ))}
    </div>
  );
};

MonthGrid.propTypes = {
  minMonth: Proptype.number.isRequired,
  maxMonth: Proptype.number.isRequired,
  maxYear: Proptype.number.isRequired,
  minYear: Proptype.number.isRequired
};

MonthGrid.defaultProps = {};

export default MonthGrid;
