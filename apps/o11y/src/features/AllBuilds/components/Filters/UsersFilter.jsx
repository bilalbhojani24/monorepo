import React from 'react';
import { useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import { PropTypes } from 'prop-types';

import { getSelectedFilters } from '../../slices/selectors';

import useFetchUser from './useFetchUser';

const UsersFilters = ({ onChangeArrayFilter, allowFetchingData }) => {
  const { users } = useSelector(getSelectedFilters);
  const { data: allUsersData } = useFetchUser(allowFetchingData);
  const allUsersDataOptions = allUsersData.map((el) => ({
    value: el.id,
    label: el.name
  }));
  const selectedUserOptions = allUsersDataOptions.filter((el) =>
    users.includes(parseInt(el.value, 10))
  );

  return (
    <O11yComboBox
      isMulti
      placeholder="Select"
      label="User"
      options={allUsersDataOptions}
      onChange={(selectedValues) => {
        onChangeArrayFilter(selectedValues, 'users');
      }}
      value={selectedUserOptions}
      checkPosition
      virtuosoWidth="480px"
      optionsListWrapperClassName="min-w-max overflow-hidden"
    />
  );
};

UsersFilters.propTypes = {
  onChangeArrayFilter: PropTypes.func.isRequired,
  allowFetchingData: PropTypes.bool.isRequired
};

export default UsersFilters;
