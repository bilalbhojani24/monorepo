import { useEffect, useState } from 'react';
import { fetchBuildListing } from 'api/fetchTestAutomationData';

export default function useAutomatedTestListing() {
  const [buildListing, setBuildListing] = useState([]);

  const onInputValueChange = (value) => {
    console.log('Something is changed...', value);
  };

  useEffect(() => {
    fetchBuildListing().then((response) => {
      console.log('response: ', response);
      setBuildListing(response);
    });
  });

  return {
    buildListing,
    onInputValueChange
  };
}
