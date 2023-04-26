import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { O11yComboBox } from 'common/bifrostProxy';
import { PropTypes } from 'prop-types';

import { getBuildTagsData } from '../../slices/dataSlice';
import { getSelectedFilterTags } from '../../slices/selectors';

const TagsFilters = ({ onChangeArrayFilter, allowFetchingData }) => {
  const dispatch = useDispatch();
  const { projectNormalisedName } = useParams();
  const tags = useSelector(getSelectedFilterTags);
  const [allTagsData, setAllTagsData] = useState({
    isLoading: false,
    data: []
  });
  const fetchTagsData = useCallback(
    (query = '') => {
      if (!projectNormalisedName) return;
      setAllTagsData({ isLoading: false, data: [] });
      dispatch(
        getBuildTagsData({
          projectNormalisedName,
          query
        })
      )
        .unwrap()
        .then((res) => {
          setAllTagsData({ isLoading: false, data: res.data });
        })
        .catch(() => {
          setAllTagsData({ isLoading: false, data: [] });
        });
    },
    [dispatch, projectNormalisedName]
  );

  useEffect(() => {
    if (allowFetchingData) {
      fetchTagsData();
    }
  }, [fetchTagsData, allowFetchingData]);
  const allTagsDataOptions = allTagsData.data.map((el) => ({
    value: el,
    label: el
  }));
  const selectedTagsOptions = allTagsDataOptions.filter((el) =>
    tags.includes(el.value)
  );
  return (
    <O11yComboBox
      isMulti
      placeholder="Select"
      label="Tags"
      options={allTagsDataOptions}
      onChange={(selectedValues) => {
        onChangeArrayFilter(selectedValues, 'tags');
      }}
      value={selectedTagsOptions}
      checkPosition="right"
      virtuosoWidth="350px"
    />
  );
};

TagsFilters.propTypes = {
  onChangeArrayFilter: PropTypes.func.isRequired,
  allowFetchingData: PropTypes.bool.isRequired
};

export default TagsFilters;
