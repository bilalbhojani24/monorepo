import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTestCasesData } from 'features/AutomatedTest/AutomatedTestBuild/slices/selector';

export default function useTests() {
  const testRuns = useSelector(getTestCasesData);
  const [searchText, setSearchText] = useState('');
  const [filteredTestRuns, setFilteredTestRuns] = useState(testRuns);
  const onInputValueChange = (e) => {
    setSearchText(e.target.value);
  };

  const onFilterSearch = () => {
    console.log('onFilterSearch: ', onFilterSearch);
  };

  useEffect(() => {
    const searchTextTrimmed = searchText.trim();
    if (searchTextTrimmed.length) {
      setFilteredTestRuns(
        testRuns.filter(
          ({ name, error }) =>
            name.toLowerCase().includes(searchTextTrimmed) ||
            (error && error.toLowerCase().includes(searchTextTrimmed))
        )
      );
    } else {
      setFilteredTestRuns(testRuns);
    }
  }, [testRuns, searchText]);

  return {
    testRuns,
    filteredTestRuns,
    onInputValueChange,
    onFilterSearch
  };
}
