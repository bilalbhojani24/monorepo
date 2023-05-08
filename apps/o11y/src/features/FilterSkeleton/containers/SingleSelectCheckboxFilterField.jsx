import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yCheckbox } from 'common/bifrostProxy';
import { setSelectedFilters } from 'features/FilterSkeleton/slices/filterSlice';
import { getSelectedFilterByBooleanType } from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

const SingleSelectCheckboxFilterField = ({ type, label, inputLabel }) => {
  const dispatch = useDispatch();
  const storedValue = useSelector(getSelectedFilterByBooleanType(type));

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!!storedValue?.value);
  }, [storedValue]);

  const handleChange = () => {
    if (storedValue?.value) {
      dispatch(
        setSelectedFilters({
          type,
          operationType: 'removeOperation',
          id: type,
          text: null,
          value: null
        })
      );
    } else {
      dispatch(
        setSelectedFilters({
          type,
          operationType: 'addOperation',
          id: type,
          text: true,
          value: true
        })
      );
    }
  };

  return (
    <div className="">
      <p className="text-base-700 mb-2 text-sm font-medium leading-5">
        {label}
      </p>
      <O11yCheckbox
        border={false}
        checked={checked}
        data={{
          label: inputLabel,
          value: `${type}-true`
        }}
        onChange={handleChange}
        wrapperClassName="mb-1"
      />
    </div>
  );
};
SingleSelectCheckboxFilterField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired
};

export default SingleSelectCheckboxFilterField;
