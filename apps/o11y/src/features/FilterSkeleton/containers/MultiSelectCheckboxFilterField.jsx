import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yCheckbox } from 'common/bifrostProxy';
import { setSelectedFilters } from 'features/FilterSkeleton/slices/filterSlice';
import { getSelectedFilterByBooleanType } from 'features/FilterSkeleton/slices/selectors';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';

const MultiSelectCheckboxFilterField = ({
  type,
  label,
  yesLabel,
  noLabel,
  id
}) => {
  const dispatch = useDispatch();
  const storedValue = useSelector(getSelectedFilterByBooleanType(type));

  const [isYesChecked, setIsYesChecked] = useState(false);
  const [isNoChecked, setIsNoChecked] = useState(false);

  useEffect(() => {
    if (!isNil(storedValue)) {
      const isChecked = !!storedValue.value;
      if (isChecked) {
        setIsYesChecked(true);
        setIsNoChecked(false);
      } else {
        setIsYesChecked(false);
        setIsNoChecked(true);
      }
    } else {
      setIsYesChecked(false);
      setIsNoChecked(false);
    }
  }, [storedValue]);

  const handleChange = ({ yes, no }) => {
    if ((yes && no) || (!yes && !no)) {
      dispatch(
        setSelectedFilters({
          type,
          operationType: 'removeOperation',
          id,
          text: null,
          value: null
        })
      );
    } else {
      dispatch(
        setSelectedFilters({
          type,
          operationType: 'addOperation',
          id,
          text: yes || !no,
          value: yes || !no
        })
      );
    }
  };

  const handleYesChange = () => {
    setIsYesChecked(!isYesChecked);
    if (isNoChecked && !isYesChecked) {
      setIsNoChecked(false);
      handleChange({ yes: false, no: false });
    }
    handleChange({ yes: !isYesChecked, no: false });
  };

  const handleNoChange = () => {
    setIsNoChecked(!isNoChecked);
    if (isYesChecked && !isNoChecked) {
      setIsYesChecked(false);
      handleChange({ yes: false, no: false });
    }
    handleChange({ yes: false, no: !isNoChecked });
  };

  return (
    <div className="">
      <p className="text-base-700 mb-2 text-sm font-medium leading-5">
        {label}
      </p>
      <O11yCheckbox
        border={false}
        checked={isYesChecked}
        data={{
          label: yesLabel,
          value: `${id}-true`
        }}
        onChange={handleYesChange}
        wrapperClassName="mb-1"
      />
      <O11yCheckbox
        border={false}
        checked={isNoChecked}
        data={{
          label: noLabel,
          value: `${id}-false`
        }}
        onChange={handleNoChange}
      />
    </div>
  );
};
MultiSelectCheckboxFilterField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  yesLabel: PropTypes.string.isRequired,
  noLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default MultiSelectCheckboxFilterField;
