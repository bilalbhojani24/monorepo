import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import {
  BUILD_FILTER_OPERATIONS,
  BUILD_FILTER_TYPES
} from 'features/AllBuilds/constants';
import { getAppliedFiltersIdsByType } from 'features/AllBuilds/slices/buildsSelectors';
import {
  getUserNamesData,
  setSelectedFilters
} from 'features/AllBuilds/slices/buildsSlice';
import { getComboBoxDiffStatus } from 'features/AllBuilds/utils/common';
import { getActiveProject } from 'globalSlice/selectors';
import debounce from 'lodash/debounce';

const UsersFilters = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const activeProject = useSelector(getActiveProject);

  const [isLoading, setIsLoading] = useState(false);
  const appliedFilters = useSelector(
    getAppliedFiltersIdsByType(BUILD_FILTER_TYPES.users)
  );
  const [userNames, setUserNames] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchData = useCallback(
    (query = '') => {
      if (activeProject?.normalisedName) {
        setIsLoading(true);
        dispatch(
          getUserNamesData({
            projectNormalisedName: activeProject?.normalisedName,
            query
          })
        )
          .unwrap()
          .then((res) => {
            if (isMounted.current) {
              setUserNames(res.data);
            }
          })
          .finally(() => {
            if (isMounted.current) {
              setIsLoading(false);
            }
          });
      }
    },
    [activeProject?.normalisedName, dispatch]
  );

  useEffect(() => {
    isMounted.current = true;

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  useEffect(() => {
    if (appliedFilters.length && !selectedUsers.length && userNames.length) {
      const selectedFilters = userNames
        .filter((item) => appliedFilters.includes(item.id))
        .map((item) => ({
          value: item.id,
          label: item.name
        }));
      setSelectedUsers(selectedFilters);
    }
  }, [appliedFilters, selectedUsers.length, userNames]);

  const handleSelect = useCallback(
    (items) => {
      const { checked, item } = getComboBoxDiffStatus(selectedUsers, items);

      if (checked) {
        dispatch(
          setSelectedFilters({
            type: BUILD_FILTER_TYPES.users,
            operation: BUILD_FILTER_OPERATIONS.ADD,
            id: item.value,
            text: item.label
          })
        );
      } else {
        dispatch(
          setSelectedFilters({
            type: BUILD_FILTER_TYPES.users,
            operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_ID,
            id: item.value,
            text: item.label
          })
        );
      }
      setSelectedUsers(items);
    },
    [dispatch, selectedUsers]
  );

  const handleSearchChange = useCallback(
    (searchText) => {
      fetchData(searchText);
    },
    [fetchData]
  );

  const debouncedSearch = useMemo(
    () => debounce((text) => handleSearchChange(text), 300),
    [handleSearchChange]
  );

  const allUsersDataOptions = userNames.map((el) => ({
    value: el.id,
    label: el.name
  }));

  return (
    <O11yComboBox
      isMulti
      placeholder="Select"
      label="User"
      options={allUsersDataOptions}
      onChange={handleSelect}
      value={selectedUsers}
      checkPosition="right"
      virtuosoWidth="350px"
      isLoading={isLoading}
      onSearch={debouncedSearch}
      isAsyncSearch
    />
  );
};

export default UsersFilters;
