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
  getBuildTagsData,
  setSelectedFilters
} from 'features/AllBuilds/slices/buildsSlice';
import { getComboBoxDiffStatus } from 'features/AllBuilds/utils/common';
import { getActiveProject } from 'globalSlice/selectors';
import debounce from 'lodash/debounce';

const TagsFilters = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const activeProject = useSelector(getActiveProject);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const appliedFilters = useSelector(
    getAppliedFiltersIdsByType(BUILD_FILTER_TYPES.tags)
  );

  const fetchData = useCallback(
    (query = '') => {
      if (activeProject?.normalisedName) {
        setIsLoading(true);
        dispatch(
          getBuildTagsData({
            projectNormalisedName: activeProject?.normalisedName,
            query
          })
        )
          .unwrap()
          .then((res) => {
            if (isMounted.current) {
              setTags(res.data);
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
    if (appliedFilters.length && !tags.length) {
      const selectedFilters = appliedFilters.map((item) => ({
        label: item,
        value: item
      }));
      setSelectedTags(selectedFilters);
    }
  }, [appliedFilters, tags.length]);

  const handleSelect = useCallback(
    (items) => {
      const { checked, item } = getComboBoxDiffStatus(selectedTags, items);

      if (checked) {
        dispatch(
          setSelectedFilters({
            type: BUILD_FILTER_TYPES.tags,
            operation: BUILD_FILTER_OPERATIONS.ADD,
            id: item.value,
            text: item.value
          })
        );
      } else {
        dispatch(
          setSelectedFilters({
            type: BUILD_FILTER_TYPES.tags,
            operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_ID,
            id: item.value,
            text: item.value
          })
        );
      }
      setSelectedTags(items);
    },
    [dispatch, selectedTags]
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

  const allTags = useMemo(
    () =>
      tags.map((item) => ({
        value: item,
        label: item
      })),
    [tags]
  );

  return (
    <O11yComboBox
      isMulti
      placeholder="Select"
      label="Tags"
      options={allTags}
      onChange={handleSelect}
      value={selectedTags}
      checkPosition="right"
      virtuosoWidth="350px"
      isLoading={isLoading}
      onSearch={debouncedSearch}
      isAsyncSearch
    />
  );
};

export default TagsFilters;
