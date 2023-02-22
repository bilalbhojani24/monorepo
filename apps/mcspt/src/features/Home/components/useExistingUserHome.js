import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { extractSessionDetailsById } from '../slices/homeThunks';

const rowSearchCriteria = (row, newValue) => {
  if (row?.name?.toLowerCase().indexOf(newValue.toLowerCase()) !== -1) {
    return true;
  }

  if (
    row?.package?.name?.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
  ) {
    return true;
  }

  return (
    row?.device?.name?.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
  );
};

const useExistingUserHome = (previousUserSessions) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableRows, setTableRows] = useState(previousUserSessions);
  const [currentSortDir, setCurrentSortDir] = useState('asc');

  const navigateToPath = useNavigate();

  const dispatch = useDispatch();

  const performSearch = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    setTableRows(() =>
      previousUserSessions.filter((singleRow) =>
        rowSearchCriteria(singleRow, newValue)
      )
    );
  };

  const sortRows = () => {
    const rowsToBeSorted = [...previousUserSessions];

    setTableRows(
      rowsToBeSorted.sort((a, b) => {
        if (a.name > b.name) {
          return currentSortDir === 'asc' ? -1 : 1;
        }

        if (b.name > a.name) {
          return currentSortDir === 'asc' ? 1 : -1;
        }

        return 0;
      })
    );

    setCurrentSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sessionSelected = (row) => {
    dispatch(extractSessionDetailsById(row?.uuid, navigateToPath));
  };

  return {
    searchTerm,
    tableRows,
    performSearch,
    sortRows,
    currentSortDir,
    sessionSelected
  };
};

export default useExistingUserHome;
