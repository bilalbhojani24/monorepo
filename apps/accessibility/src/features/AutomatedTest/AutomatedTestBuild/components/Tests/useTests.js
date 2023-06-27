import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getTestCasesData,
  getTestFilters
} from 'features/AutomatedTest/AutomatedTestBuild/slices/selector';
import { deleteUrlQueryParam, updateUrlWithQueryParam } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

export default function useTests() {
  const navigate = useNavigate();
  const testRuns = useSelector(getTestCasesData);
  const testFilters = useSelector(getTestFilters);
  const [searchText, setSearchText] = useState('');
  const [filteredTestRuns, setFilteredTestRuns] = useState(testRuns);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [testId, setTestId] = useState(null);
  const [menuFilters, setMenuFilters] = useState({
    pages: [],
    tags: [],
    file: [],
    status: []
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const activeTestId = params.get('activeTestId');
    if (activeTestId) {
      setTestId(activeTestId);
      setIsSliderOpen(true);
    }
  }, []);

  const onInputValueChange = (e) => {
    setSearchText(e.target.value);
  };

  const applyFilters = (filterTerms) =>
    testRuns?.reduce((acc, curr) => {
      let found = true;
      Object.entries(filterTerms).forEach(([key, val]) => {
        if (val.length > 0) {
          const searchValues = val.map((filter) => filter.label);
          if (['tags', 'pages'].includes(key)) {
            const intersection = searchValues.filter((item) =>
              curr[key].includes(item)
            );
            if (intersection.length === 0) {
              found = false;
            }
          } else if (!searchValues.includes(curr[key])) {
            found = false;
          }
        }
      });
      if (found) {
        const accumulator = { ...acc };
        accumulator[curr.id] = curr;
        return accumulator;
      }
      return acc;
    }, {});

  const searchTextTrimmed = searchText.trim();
  const searchTests = searchTextTrimmed.length
    ? filteredTestRuns.filter(
        ({ name, error }) =>
          name.toLowerCase().includes(searchTextTrimmed.toLowerCase()) ||
          (error &&
            error.message
              .toLowerCase()
              .includes(searchTextTrimmed.toLowerCase()))
      )
    : filteredTestRuns;

  const refreshFilterData = (updatedFilterData) => {
    const filterTests = Object.values(applyFilters(updatedFilterData));
    setFilteredTestRuns(filterTests);
  };

  const onFilterSearch = (value, name) => {
    const updatedFilterData = {
      ...menuFilters,
      [name]: [...value]
    };
    setMenuFilters(updatedFilterData);
    refreshFilterData(updatedFilterData);
  };

  const onFilterBadgeClose = (key) => {
    const updatedFilterData = { ...menuFilters, [key]: [] };
    setMenuFilters(updatedFilterData);
    refreshFilterData(updatedFilterData);
  };

  const handleRowClick = (id) => {
    setIsSliderOpen(true);
    setTestId(id);
    const updatedPath = updateUrlWithQueryParam({
      activeTestId: id
    });
    navigate(`?${updatedPath}`);
    logEvent('InteractedWithAutomatedTestsBuildView', {
      actionType: 'Select specific item',
      action: 'Select test',
      Tab: 'Tests'
    });
  };

  const onSliderClose = () => {
    setIsSliderOpen(false);
    const path = deleteUrlQueryParam(['activeSlideOverTab', 'activeTestId']);
    navigate(`?${path}`);
  };

  const onFilterClear = () => {
    const clearedObject = {};
    Object.keys(menuFilters).forEach((key) => {
      clearedObject[key] = [];
    });
    setMenuFilters(clearedObject);
    refreshFilterData(clearedObject);
  };

  return {
    testRuns,
    filteredTestRuns,
    onInputValueChange,
    onFilterSearch,
    isSliderOpen,
    handleRowClick,
    onSliderClose,
    testId,
    testFilters,
    menuFilters,
    setMenuFilters,
    onFilterBadgeClose,
    searchTests,
    searchText,
    applyFilters,
    onFilterClear
  };
}