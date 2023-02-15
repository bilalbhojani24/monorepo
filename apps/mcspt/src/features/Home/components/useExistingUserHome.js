import { useState } from 'react';

const useExistingUserHome = (previousUserSessions) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableRows, setTableRows] = useState(previousUserSessions);
  const [currentSortDir, setCurrentSortDir] = useState('asc');

  const performSearch = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    setTableRows(() =>
      previousUserSessions.filter(
        (x) =>
          x.application.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
      )
    );
  };

  const sortRows = () => {
    const rowsToBeSorted = [...previousUserSessions];

    setTableRows(
      rowsToBeSorted.sort((a, b) => {
        if (a.testSessionName > b.testSessionName) {
          return currentSortDir === 'asc' ? -1 : 1;
        }

        if (b.testSessionName > a.testSessionName) {
          return currentSortDir === 'asc' ? 1 : -1;
        }

        return 0;
      })
    );

    setCurrentSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return {
    searchTerm,
    tableRows,
    performSearch,
    sortRows,
    currentSortDir
  };
};

export default useExistingUserHome;
