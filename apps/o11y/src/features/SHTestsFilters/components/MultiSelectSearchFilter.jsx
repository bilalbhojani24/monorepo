import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import { getComboBoxDiffStatus } from 'features/AllBuilds/utils/common';
import { setSelectedFilters } from 'features/FilterSkeleton/slices/filterSlice';
import { getSelectedFiltersByType } from 'features/FilterSkeleton/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

const MultiSelectSearchFilter = ({ type, placeholder, label, searchAPI }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const selectedFilters = useSelector(getSelectedFiltersByType(type));
  const activeProject = useSelector(getActiveProject);
  const isMounted = useRef(false);
  const [availableOptions, setAvailableOptions] = useState([]);

  const fetchData = useCallback(
    (query = '') => {
      if (activeProject?.normalisedName) {
        setIsLoading(true);
        dispatch(
          searchAPI({
            projectNormalisedName: activeProject?.normalisedName,
            query
          })
        )
          .unwrap()
          .then((res) => {
            if (isMounted.current) {
              setAvailableOptions(res.data);
            }
          })
          .finally(() => {
            if (isMounted.current) {
              setIsLoading(false);
            }
          });
      }
    },
    [activeProject?.normalisedName, dispatch, searchAPI]
  );

  useEffect(() => {
    isMounted.current = true;

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  const selected = useMemo(
    () =>
      selectedFilters.map((item) => ({
        label: item.text,
        value: item.value
      })),
    [selectedFilters]
  );

  const handleSelect = useCallback(
    (items) => {
      const { checked, item } = getComboBoxDiffStatus(selected, items);

      if (checked) {
        dispatch(
          setSelectedFilters({
            type,
            operationType: 'addOperation',
            id: `${type}:${item.value}`,
            text: item.value,
            value: item.value
          })
        );
      } else {
        dispatch(
          setSelectedFilters({
            type,
            operationType: 'removeOperation',
            id: `${type}:${item.value}`,
            text: item.value,
            value: item.value
          })
        );
      }
    },
    [dispatch, selected, type]
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

  const allOptions = useMemo(
    () =>
      availableOptions.map((item) => ({
        value: item,
        label: item
      })),
    [availableOptions]
  );

  return (
    <O11yComboBox
      isMulti
      placeholder={placeholder}
      label={label}
      options={allOptions}
      onChange={handleSelect}
      value={selected}
      checkPosition="right"
      virtuosoWidth="350px"
      isLoading={isLoading}
      onSearch={debouncedSearch}
      isAsyncSearch
    />
  );
};

MultiSelectSearchFilter.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  searchAPI: PropTypes.func.isRequired
};

export default MultiSelectSearchFilter;
