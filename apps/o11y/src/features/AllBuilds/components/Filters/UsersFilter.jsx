import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import { setFiltersMetaData } from 'features/AllBuilds/slices/dataSlice';
import { PropTypes } from 'prop-types';

import { getSelectedFilterUsers } from '../../slices/selectors';

import useFetchUser from './useFetchUser';

const UsersFilters = ({ onChangeArrayFilter, allowFetchingData }) => {
  const dispatch = useDispatch();
  const users = useSelector(getSelectedFilterUsers);
  const { data: allUsersData } = useFetchUser(allowFetchingData);
  const allUsersDataOptions = allUsersData.map((el) => ({
    value: el.id.toString(),
    label: el.name
  }));
  const selectedUserOptions = allUsersDataOptions.filter((el) =>
    users.includes(el.value.toString())
  );

  useEffect(() => {
    dispatch(
      setFiltersMetaData({
        allUsers: allUsersData
      })
    );
  }, [allUsersData, dispatch]);

  return allUsersData && users ? (
    <O11yComboBox
      isMulti
      placeholder="Select"
      label="User"
      options={allUsersDataOptions}
      onChange={(selectedValues) => {
        onChangeArrayFilter(selectedValues, 'users');
      }}
      value={selectedUserOptions}
      checkPosition="right"
      virtuosoWidth="480px"
      optionsListWrapperClassName="min-w-max overflow-hidden"
    />
  ) : null;
};

UsersFilters.propTypes = {
  onChangeArrayFilter: PropTypes.func.isRequired,
  allowFetchingData: PropTypes.bool.isRequired
};

export default UsersFilters;
