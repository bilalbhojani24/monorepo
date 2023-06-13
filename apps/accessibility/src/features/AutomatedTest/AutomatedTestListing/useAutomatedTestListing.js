import { useEffect, useRef, useState } from 'react';
import {
  fetchAllProjectList,
  fetchAllTestRuns,
  fetchProjectById
} from 'api/fetchTestAutomationData';

import { logEvent } from 'utils/logEvent';

export default function useAutomatedTestListing() {
  const [buildListing, setBuildListing] = useState([]);
  const [comboboxItems, setComboboxItems] = useState([]);
  const projectListing = useRef([]);
  const allBuilds = useRef([]);

  const handleSearch = (value, key, arr) => {
    if (value !== '') {
      return arr.filter(
        (project) =>
          project[key]
            .toLowerCase()
            .search(value.toLocaleLowerCase().toString()) !== -1
      );
    }
    return arr;
  };

  const onInputValueChange = (e) => {
    const { value } = e.target;
    const result = handleSearch(value, 'name', allBuilds.current);
    setBuildListing(result);
  };

  const onComboboxValueChange = (value) => {
    const result = handleSearch(value, 'name', projectListing.current);
    setComboboxItems([{ id: 0, name: 'All projects' }, ...result]);
  };

  const handleSelectChange = (id) => {
    if (id === 0) {
      fetchAllTestRuns().then((response) => {
        setBuildListing(response);
      });
      return;
    }
    fetchProjectById(id).then((response) => {
      setBuildListing(response);
    });
    logEvent('InteractedWithAutomatedTestsHomepageView', {
      action: 'Select project'
    });
  };

  useEffect(() => {
    fetchAllTestRuns().then((response) => {
      setBuildListing(response);
      allBuilds.current = response;
      logEvent('OnAutomatedTestsHomepageView', {
        buildsAvailable: response.length > 0
      });
    });
  }, []);

  useEffect(() => {
    fetchAllProjectList().then((response) => {
      projectListing.current = response;
      setComboboxItems([{ id: 0, name: 'All projects' }, ...response]);
    });
  }, []);

  return {
    buildListing,
    onComboboxValueChange,
    onInputValueChange,
    handleSelectChange,
    projectListing,
    comboboxItems
  };
}
