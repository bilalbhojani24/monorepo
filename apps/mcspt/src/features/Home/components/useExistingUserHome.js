import { useState } from 'react';

const useExistingUserHome = (previousUserSessions) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableRows, setTableRows] = useState(previousUserSessions);

  const performSearch = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    setTableRows(() =>
      previousUserSessions.filter(
        (x) => x.application.toLowerCase().indexOf(newValue) !== -1
      )
    );
  };

  const sortRows = () => {
    const rowsToBeSorted = [...previousUserSessions];

    setTableRows(
      rowsToBeSorted.sort((a, b) => {
        if (a.testSessionName > b.testSessionName) {
          return -1;
        }

        if (b.testSessionName > a.testSessionName) {
          return 1;
        }

        return 0;
      })
    );
  };

  return {
    searchTerm,
    tableRows,
    performSearch,
    sortRows
  };
};

export default useExistingUserHome;
